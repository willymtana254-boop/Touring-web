import { Head } from '@inertiajs/react';

// ── Real business WhatsApp number ─────────────────────────────────────────
const WHATSAPP_NUMBER = '254728769798';

type Booking = {
    full_name: string;
    phone: string;
    from_location: string;
    to_location: string;
    travel_date: string;
    vehicle_type: string;
    passengers: number;
    reference: string;
};

export default function BookingConfirmation({ booking }: { booking: Booking }) {
    const waMsg = encodeURIComponent(
        `Hi Biryaa Travels, I just submitted a booking! 🌊\n\n` +
        `📋 *Ref:* ${booking.reference}\n` +
        `👤 *Name:* ${booking.full_name}\n` +
        `📞 *Phone:* ${booking.phone}\n` +
        `🗺️ *From:* ${booking.from_location}\n` +
        `📍 *To:* ${booking.to_location}\n` +
        `📅 *Date:* ${booking.travel_date}\n` +
        `🚗 *Vehicle:* ${booking.vehicle_type === 'van' ? '14-Seater Van' : 'Saloon / 7-Seater'}\n` +
        `👥 *Passengers:* ${booking.passengers}\n\n` +
        `Please confirm availability. Thank you!`
    );

    return (
        <>
            <Head title="Booking Confirmed – Biryaa Travels" />
            <div style={{ minHeight: '100vh', background: '#F7F0E3', fontFamily: 'Inter, sans-serif' }}>

                {/* Nav */}
                <nav style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem 4%', background: 'rgba(13,43,69,0.97)', backdropFilter: 'blur(12px)',
                }}>
                    <a href="/" style={{
                        fontFamily: 'Playfair Display, serif', fontSize: '1.4rem',
                        fontWeight: 900, color: '#fff', textDecoration: 'none',
                    }}>
                        Biryaa<span style={{ color: '#E8633A' }}>.</span>Travels
                    </a>
                    <a href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textDecoration: 'none' }}>
                        ← Home
                    </a>
                </nav>

                {/* Card */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: '100vh', padding: '6rem 1.5rem 3rem',
                }}>
                    <div style={{
                        background: '#fff', borderRadius: 20, padding: '2.5rem 2rem',
                        maxWidth: 520, width: '100%', textAlign: 'center',
                        boxShadow: '0 8px 40px rgba(13,43,69,0.1)',
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌊</div>
                        <h1 style={{
                            fontFamily: 'Playfair Display, serif', fontSize: '2rem',
                            fontWeight: 900, color: '#0D2B45', marginBottom: '0.75rem',
                        }}>
                            You're All Set!
                        </h1>
                        <p style={{ color: '#5A6472', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                            Your booking has been received. Our team will contact you within the hour to confirm details.
                        </p>

                        {/* Reference Box */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0D2B45, #2D6A4F)',
                            borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem',
                        }}>
                            <div style={{
                                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em',
                                textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem',
                            }}>
                                Booking Reference
                            </div>
                            <div style={{
                                fontFamily: 'Playfair Display, serif', fontSize: '1.8rem',
                                fontWeight: 900, color: '#7BC8B2', letterSpacing: '0.05em',
                            }}>
                                {booking.reference}
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div style={{
                            textAlign: 'left', background: '#F7F0E3',
                            borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem',
                        }}>
                            {[
                                ['Name',       booking.full_name],
                                ['Phone',      booking.phone],
                                ['From',       booking.from_location],
                                ['To',         booking.to_location],
                                ['Date',       booking.travel_date],
                                ['Vehicle',    booking.vehicle_type === 'van' ? '14-Seater Van' : 'Saloon / 7-Seater'],
                                ['Passengers', String(booking.passengers)],
                            ].map(([label, value]) => (
                                <div key={label} style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    padding: '0.5rem 0', borderBottom: '1px solid rgba(13,43,69,0.06)',
                                    fontSize: '0.875rem', gap: '1rem',
                                }}>
                                    <span style={{ color: '#5A6472' }}>{label}</span>
                                    <strong style={{ color: '#0D2B45', textAlign: 'right' }}>{value}</strong>
                                </div>
                            ))}
                        </div>

                        {/* WhatsApp Button */}
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                background: '#25D366', color: '#fff', padding: '0.85rem 2rem',
                                borderRadius: '2rem', fontWeight: 700, textDecoration: 'none',
                                fontSize: '0.95rem', marginBottom: '1rem',
                                boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Confirm on WhatsApp
                        </a>
                        <br />
                        <a href="/" style={{ color: '#5A6472', fontSize: '0.875rem', textDecoration: 'none' }}>
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}