import { useState } from 'react';
import { Head, router } from '@inertiajs/react';

const counties = ['Mombasa', 'Kilifi', 'Kwale', 'Lamu', 'Malindi', 'Taita Taveta'];
const destinations: Record<string, string[]> = {
    'Mombasa':       ['Kilifi Town', 'Watamu', 'Malindi', 'Diani Beach', 'Lamu Old Town', 'Voi / Tsavo'],
    'Kilifi':        ['Mombasa City', 'Watamu', 'Malindi', 'Diani Beach', 'Lamu Old Town'],
    'Kwale':         ['Mombasa City', 'Kilifi Town', 'Malindi', 'Voi / Tsavo'],
    'Lamu':          ['Mombasa City', 'Malindi', 'Kilifi Town'],
    'Malindi':       ['Mombasa City', 'Kilifi Town', 'Lamu Old Town', 'Diani Beach'],
    'Taita Taveta':  ['Mombasa City', 'Diani Beach', 'Kilifi Town'],
};

const fares: Record<string, { saloon: number; van: number }> = {
    'Mombasa|Kilifi Town':      { saloon: 4500,  van: 7000  },
    'Mombasa|Watamu':           { saloon: 7500,  van: 12000 },
    'Mombasa|Malindi':          { saloon: 7500,  van: 12000 },
    'Mombasa|Diani Beach':      { saloon: 3500,  van: 5500  },
    'Mombasa|Lamu Old Town':    { saloon: 18000, van: 28000 },
    'Mombasa|Voi / Tsavo':      { saloon: 9000,  van: 14500 },
    'Kilifi|Watamu':            { saloon: 4000,  van: 6500  },
    'Kilifi|Malindi':           { saloon: 4000,  van: 6500  },
    'Kilifi|Diani Beach':       { saloon: 7500,  van: 12000 },
    'Kilifi|Lamu Old Town':     { saloon: 12000, van: 19000 },
    'Malindi|Lamu Old Town':    { saloon: 12000, van: 19000 },
    'Kwale|Voi / Tsavo':        { saloon: 11000, van: 17000 },
};

function getPrice(from: string, to: string, vehicle: string): string {
    const key = `${from}|${to}`;
    const rev = `${to}|${from}`;
    const entry = fares[key] || fares[rev];
    if (!entry) return 'Contact us for quote';
    const price = vehicle === 'van' ? entry.van : entry.saloon;
    return `KSh ${price.toLocaleString()}`;
}

type FormData = {
    full_name: string;
    phone: string;
    email: string;
    from_location: string;
    to_location: string;
    travel_date: string;
    vehicle_type: string;
    passengers: string;
    notes: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [reference, setReference] = useState('');
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<FormData>({
        full_name: '',
        phone: '',
        email: '',
        from_location: '',
        to_location: '',
        travel_date: '',
        vehicle_type: 'saloon',
        passengers: '1',
        notes: '',
    });

    const [errors, setErrors] = useState<Errors>({});

    const today = new Date().toISOString().split('T')[0];

    const set = (field: keyof FormData, value: string) => {
        setForm(f => ({ ...f, [field]: value }));
        setErrors(e => ({ ...e, [field]: '' }));
        if (field === 'from_location') setForm(f => ({ ...f, from_location: value, to_location: '' }));
    };

    const validateStep1 = (): boolean => {
        const e: Errors = {};
        if (!form.full_name.trim()) e.full_name = 'Full name is required';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        else if (!/^(\+?254|0)[17]\d{8}$/.test(form.phone.replace(/\s/g, '')))
            e.phone = 'Enter a valid Kenyan number e.g. 0712345678';
        if (form.email && !/\S+@\S+\.\S+/.test(form.email))
            e.email = 'Enter a valid email address';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateStep2 = (): boolean => {
        const e: Errors = {};
        if (!form.from_location) e.from_location = 'Please select where you are travelling from';
        if (!form.to_location) e.to_location = 'Please select your destination';
        if (!form.travel_date) e.travel_date = 'Please select a travel date';
        if (!form.vehicle_type) e.vehicle_type = 'Please select a vehicle type';
        if (!form.passengers || parseInt(form.passengers) < 1) e.passengers = 'At least 1 passenger required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const nextStep = () => {
        if (step === 1 && validateStep1()) setStep(2);
        if (step === 2 && validateStep2()) setStep(3);
    };

    const handleSubmit = () => {
        setLoading(true);
        router.post('/book', form, {
            onSuccess: (page: any) => {
                const ref = page.props?.reference || 'BT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
                setReference(ref);
                setSubmitted(true);
                setLoading(false);
            },
            onError: (errs: Errors) => {
                setErrors(errs);
                setLoading(false);
                setStep(1);
            },
        });
    };

    const estimatedPrice = form.from_location && form.to_location && form.vehicle_type
        ? getPrice(form.from_location, form.to_location, form.vehicle_type)
        : null;

    // ── CONFIRMATION SCREEN ──
    if (submitted) {
        return (
            <>
                <Head title="Booking Confirmed – Biryaa Travels" />
                <div style={styles.page}>
                    <Nav />
                    <div style={styles.confirmWrap}>
                        <div style={styles.confirmCard}>
                            <div style={styles.confirmIcon}>🌊</div>
                            <h1 style={styles.confirmTitle}>You're All Set!</h1>
                            <p style={styles.confirmSub}>Your booking request has been received. Our team will contact you within the hour to confirm details and payment.</p>
                            <div style={styles.refBox}>
                                <div style={styles.refLabel}>Booking Reference</div>
                                <div style={styles.refNum}>{reference || 'BT-PENDING'}</div>
                            </div>
                            <div style={styles.confirmDetails}>
                                <div style={styles.confirmRow}><span>Name</span><strong>{form.full_name}</strong></div>
                                <div style={styles.confirmRow}><span>Phone</span><strong>{form.phone}</strong></div>
                                <div style={styles.confirmRow}><span>Route</span><strong>{form.from_location} → {form.to_location}</strong></div>
                                <div style={styles.confirmRow}><span>Date</span><strong>{form.travel_date}</strong></div>
                                <div style={styles.confirmRow}><span>Vehicle</span><strong>{form.vehicle_type === 'van' ? '14-Seater Van' : 'Saloon / 7-Seater'}</strong></div>
                                <div style={styles.confirmRow}><span>Passengers</span><strong>{form.passengers}</strong></div>
                                {estimatedPrice && <div style={styles.confirmRow}><span>Estimated Fare</span><strong style={{ color: '#E8633A' }}>{estimatedPrice}</strong></div>}
                            </div>
                            <a
                                href={`https://wa.me/254700000000?text=Hi, I just booked with Biryaa Travels. My reference is ${reference || 'BT-PENDING'}. Please confirm my trip from ${form.from_location} to ${form.to_location} on ${form.travel_date}.`}
                                target="_blank"
                                rel="noreferrer"
                                style={styles.waBtn}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                Confirm on WhatsApp
                            </a>
                            <a href="/" style={styles.homeLink}>← Back to Home</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // ── FORM ──
    return (
        <>
            <Head title="Book a Trip – Biryaa Travels" />
            <div style={styles.page}>
                <Nav />
                <div style={styles.formWrap}>
                    {/* Header */}
                    <div style={styles.formHeader}>
                        <div style={styles.eyebrow}>Biryaa Travels & Adventures</div>
                        <h1 style={styles.formTitle}>Book Your Coastal Journey</h1>
                        <p style={styles.formSub}>Fill in the details below and we'll confirm your trip within the hour.</p>
                    </div>

                    {/* Step indicator */}
                    <div style={styles.stepBar}>
                        {['Your Details', 'Trip Info', 'Review'].map((label, i) => {
                            const n = i + 1;
                            const active = step === n;
                            const done = step > n;
                            return (
                                <div key={n} style={styles.stepItem}>
                                    <div style={{ ...styles.stepDot, background: done ? '#2D6A4F' : active ? '#E8633A' : '#e0e0e0', color: done || active ? '#fff' : '#999' }}>
                                        {done ? '✓' : n}
                                    </div>
                                    <div style={{ ...styles.stepLabel, color: active ? '#E8633A' : done ? '#2D6A4F' : '#999' }}>{label}</div>
                                    {i < 2 && <div style={{ ...styles.stepLine, background: done ? '#2D6A4F' : '#e0e0e0' }} />}
                                </div>
                            );
                        })}
                    </div>

                    {/* Card */}
                    <div style={styles.card}>

                        {/* ── STEP 1: Personal Details ── */}
                        {step === 1 && (
                            <div>
                                <h2 style={styles.stepTitle}>Your Contact Details</h2>
                                <p style={styles.stepSub}>We'll use these to confirm your booking.</p>

                                <Field label="Full Name *" error={errors.full_name}>
                                    <input style={inputStyle(!!errors.full_name)} placeholder="e.g. John Mwangi" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
                                </Field>
                                <Field label="Phone Number *" error={errors.phone}>
                                    <input style={inputStyle(!!errors.phone)} placeholder="e.g. 0712 345 678" value={form.phone} onChange={e => set('phone', e.target.value)} />
                                </Field>
                                <Field label="Email Address (optional)" error={errors.email}>
                                    <input style={inputStyle(!!errors.email)} placeholder="e.g. john@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                                </Field>
                            </div>
                        )}

                        {/* ── STEP 2: Trip Details ── */}
                        {step === 2 && (
                            <div>
                                <h2 style={styles.stepTitle}>Trip Details</h2>
                                <p style={styles.stepSub}>Tell us where you're going and when.</p>

                                <Field label="Travelling From *" error={errors.from_location}>
                                    <select style={inputStyle(!!errors.from_location)} value={form.from_location} onChange={e => set('from_location', e.target.value)}>
                                        <option value="">Select county / town</option>
                                        {counties.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </Field>

                                <Field label="Destination *" error={errors.to_location}>
                                    <select style={inputStyle(!!errors.to_location)} value={form.to_location} onChange={e => set('to_location', e.target.value)} disabled={!form.from_location}>
                                        <option value="">{form.from_location ? 'Select destination' : 'Select origin first'}</option>
                                        {(destinations[form.from_location] || []).map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </Field>

                                <Field label="Travel Date *" error={errors.travel_date}>
                                    <input type="date" style={inputStyle(!!errors.travel_date)} min={today} value={form.travel_date} onChange={e => set('travel_date', e.target.value)} />
                                </Field>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <Field label="Vehicle Type *" error={errors.vehicle_type}>
                                        <select style={inputStyle(!!errors.vehicle_type)} value={form.vehicle_type} onChange={e => set('vehicle_type', e.target.value)}>
                                            <option value="saloon">Saloon / 7-Seater</option>
                                            <option value="van">14-Seater Van</option>
                                        </select>
                                    </Field>
                                    <Field label="Passengers *" error={errors.passengers}>
                                        <input type="number" min="1" max="14" style={inputStyle(!!errors.passengers)} value={form.passengers} onChange={e => set('passengers', e.target.value)} />
                                    </Field>
                                </div>

                                <Field label="Special Requests (optional)" error={errors.notes}>
                                    <textarea style={{ ...inputStyle(!!errors.notes), minHeight: 80, resize: 'vertical' }} placeholder="e.g. child seats, early pickup, wheelchair access..." value={form.notes} onChange={e => set('notes', e.target.value)} />
                                </Field>

                                {/* Live price estimate */}
                                {estimatedPrice && (
                                    <div style={styles.priceBox}>
                                        <div style={styles.priceLabel}>Estimated Fare</div>
                                        <div style={styles.priceValue}>{estimatedPrice}</div>
                                        <div style={styles.priceNote}>Per vehicle, one-way. Fuel & driver included.</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── STEP 3: Review ── */}
                        {step === 3 && (
                            <div>
                                <h2 style={styles.stepTitle}>Review Your Booking</h2>
                                <p style={styles.stepSub}>Everything look right? Hit confirm and we'll be in touch.</p>

                                <div style={styles.reviewGrid}>
                                    {[
                                        ['Full Name', form.full_name],
                                        ['Phone', form.phone],
                                        ['Email', form.email || '—'],
                                        ['From', form.from_location],
                                        ['To', form.to_location],
                                        ['Date', form.travel_date],
                                        ['Vehicle', form.vehicle_type === 'van' ? '14-Seater Van' : 'Saloon / 7-Seater'],
                                        ['Passengers', form.passengers],
                                        ...(estimatedPrice ? [['Estimated Fare', estimatedPrice]] : []),
                                        ...(form.notes ? [['Notes', form.notes]] : []),
                                    ].map(([label, value]) => (
                                        <div key={label} style={styles.reviewRow}>
                                            <span style={styles.reviewLabel}>{label}</span>
                                            <span style={{ ...styles.reviewValue, color: label === 'Estimated Fare' ? '#E8633A' : '#0D2B45' }}>{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={styles.termsNote}>
                                    By confirming, you agree that our team will contact you to finalise payment and pickup details. No payment is taken online.
                                </div>
                            </div>
                        )}

                        {/* Navigation buttons */}
                        <div style={styles.btnRow}>
                            {step > 1 && (
                                <button style={styles.btnBack} onClick={() => setStep(s => s - 1)}>
                                    ← Back
                                </button>
                            )}
                            {step < 3 && (
                                <button style={styles.btnNext} onClick={nextStep}>
                                    Continue →
                                </button>
                            )}
                            {step === 3 && (
                                <button style={{ ...styles.btnNext, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Sending...' : '✓ Confirm Booking'}
                                </button>
                            )}
                        </div>
                    </div>

                    <p style={{ textAlign: 'center', color: '#999', fontSize: '0.8rem', marginTop: '1.5rem' }}>
                        Prefer to chat? <a href="https://wa.me/254700000000" style={{ color: '#E8633A' }}>Message us on WhatsApp</a>
                    </p>
                </div>
            </div>
        </>
    );
}

// ── Sub-components ──

function Nav() {
    return (
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 4%', background: 'rgba(13,43,69,0.97)', backdropFilter: 'blur(12px)' }}>
            <a href="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 900, color: '#fff', textDecoration: 'none', letterSpacing: '-0.02em' }}>
                Bahari<span style={{ color: '#E8633A' }}>.</span>Tours
            </a>
            <a href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textDecoration: 'none' }}>← Back to Home</a>
        </nav>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#0D2B45', marginBottom: '0.4rem', letterSpacing: '0.03em' }}>{label}</label>
            {children}
            {error && <div style={{ color: '#E8633A', fontSize: '0.78rem', marginTop: '0.3rem' }}>⚠ {error}</div>}
        </div>
    );
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%', padding: '0.75rem 1rem',
    border: `1.5px solid ${hasError ? '#E8633A' : '#e0e0e0'}`,
    borderRadius: '10px', fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif', outline: 'none',
    background: hasError ? '#fff8f6' : '#fff',
    color: '#1A1A2E', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
});

// ── Styles ──
const styles: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', background: '#F7F0E3', fontFamily: 'Inter, sans-serif' },
    formWrap: { maxWidth: 620, margin: '0 auto', padding: '8rem 1.5rem 4rem' },
    formHeader: { textAlign: 'center', marginBottom: '2rem' },
    eyebrow: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#E8633A', marginBottom: '0.5rem' },
    formTitle: { fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0D2B45', marginBottom: '0.5rem' },
    formSub: { color: '#5A6472', fontSize: '0.95rem', lineHeight: 1.6 },

    stepBar: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', gap: 0 },
    stepItem: { display: 'flex', alignItems: 'center', gap: 0 },
    stepDot: { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0, transition: 'all 0.3s' },
    stepLabel: { fontSize: '0.72rem', fontWeight: 600, marginLeft: '0.4rem', marginRight: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' as const, transition: 'color 0.3s' },
    stepLine: { width: 40, height: 2, flexShrink: 0, transition: 'background 0.3s' },

    card: { background: '#fff', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 32px rgba(13,43,69,0.08)', border: '1px solid rgba(13,43,69,0.06)' },
    stepTitle: { fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 800, color: '#0D2B45', marginBottom: '0.3rem' },
    stepSub: { color: '#5A6472', fontSize: '0.875rem', marginBottom: '1.75rem' },

    priceBox: { background: 'linear-gradient(135deg, #0D2B45, #2D6A4F)', borderRadius: 12, padding: '1.2rem 1.5rem', marginTop: '0.5rem', textAlign: 'center' as const },
    priceLabel: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' },
    priceValue: { fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 900, color: '#7BC8B2' },
    priceNote: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' },

    reviewGrid: { background: '#F7F0E3', borderRadius: 12, padding: '1.25rem', marginBottom: '1.25rem' },
    reviewRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.6rem 0', borderBottom: '1px solid rgba(13,43,69,0.06)', gap: '1rem' },
    reviewLabel: { fontSize: '0.82rem', color: '#5A6472', fontWeight: 500, flexShrink: 0 },
    reviewValue: { fontSize: '0.875rem', fontWeight: 600, textAlign: 'right' as const },
    termsNote: { fontSize: '0.78rem', color: '#999', lineHeight: 1.6, textAlign: 'center' as const, marginTop: '1rem' },

    btnRow: { display: 'flex', gap: '0.75rem', marginTop: '1.75rem', justifyContent: 'flex-end' },
    btnBack: { padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1.5px solid #e0e0e0', background: '#fff', color: '#5A6472', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif' },
    btnNext: { padding: '0.75rem 2rem', borderRadius: '2rem', border: 'none', background: '#E8633A', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(232,99,58,0.35)', transition: 'opacity 0.2s' },

    confirmWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '6rem 1.5rem 3rem' },
    confirmCard: { background: '#fff', borderRadius: 20, padding: '2.5rem 2rem', maxWidth: 520, width: '100%', textAlign: 'center' as const, boxShadow: '0 8px 40px rgba(13,43,69,0.1)' },
    confirmIcon: { fontSize: '3rem', marginBottom: '1rem' },
    confirmTitle: { fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: '#0D2B45', marginBottom: '0.75rem' },
    confirmSub: { color: '#5A6472', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' },
    refBox: { background: 'linear-gradient(135deg, #0D2B45, #2D6A4F)', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' },
    refLabel: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem' },
    refNum: { fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 900, color: '#7BC8B2', letterSpacing: '0.05em' },
    confirmDetails: { textAlign: 'left' as const, background: '#F7F0E3', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' },
    confirmRow: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(13,43,69,0.06)', fontSize: '0.875rem', gap: '1rem' },
    waBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#25D366', color: '#fff', padding: '0.85rem 2rem', borderRadius: '2rem', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' },
    homeLink: { display: 'block', color: '#5A6472', fontSize: '0.875rem', textDecoration: 'none', marginTop: '0.75rem' },
};
