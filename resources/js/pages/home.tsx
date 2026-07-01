import { useState, useEffect, useMemo } from 'react';

// ── Photo pool ───────────────────────────────────────────────────────────────
const photoPool = [
    '/images/coast/coast-1.jpg',
    '/images/coast/coast-2.jpg',
    '/images/coast/coast-3.jpg',
    '/images/coast/coast-4.jpg',
    '/images/coast/coast-5.jpg',
];

function shufflePhotos(pool: string[], count: number): string[] {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    while (shuffled.length < count) {
        shuffled.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return shuffled.slice(0, count);
}

// ── Data ─────────────────────────────────────────────────────────────────────
const destinations = [
    {
        name: 'Kilifi & Watamu',
        county: 'Kilifi County',
        emoji: '🦀',
        colorFrom: '#0D6E8A',
        colorTo: '#1A8C6E',
        desc: "Tidal creeks, mangrove forests, and the Marine National Reserve. Kilifi town's bridge views at sunset are unlike anywhere else in Kenya.",
        tags: ['Marine Reserve', 'Watamu Beach', 'Gede Ruins'],
    },
    {
        name: 'Mombasa City',
        county: 'Mombasa County',
        emoji: '⚓',
        colorFrom: '#0D3D8A',
        colorTo: '#1A4B8C',
        desc: "Fort Jesus, the Old Town's carved doors, Nyali Beach — Kenya's oldest city wears its Swahili-Arab-Portuguese history openly.",
        tags: ['Fort Jesus', 'Old Town', 'Nyali Beach'],
    },
    {
        name: 'Diani & Shimba Hills',
        county: 'Kwale County',
        emoji: '🐠',
        colorFrom: '#2D6A4F',
        colorTo: '#1A8C5A',
        desc: "Africa's best-voted beach year after year, plus Shimba Hills elephant reserve inland — Kwale holds coast and wild in one county.",
        tags: ['Diani Beach', 'Shimba Hills', 'Colobus Monkey'],
    },
    {
        name: 'Lamu Old Town',
        county: 'Lamu County',
        emoji: '🕌',
        colorFrom: '#8C6A1A',
        colorTo: '#C4923A',
        desc: 'UNESCO World Heritage Site. No cars, only donkeys and dhows. The oldest Swahili settlement in East Africa, preserved in coral stone.',
        tags: ['UNESCO Site', 'Dhow Sailing', 'Shela Beach'],
    },
    {
        name: 'Malindi',
        county: 'Kilifi County',
        emoji: '🐢',
        colorFrom: '#0D7A6E',
        colorTo: '#1FAD96',
        desc: 'Vasco da Gama pillar, dolphin watching, and sea turtle nesting beaches. Malindi blends colonial history with vibrant coastal culture.',
        tags: ['Malindi Marine Park', 'Da Gama Pillar', 'Turtle Watch'],
    },
    {
        name: 'Tsavo & Taita Hills',
        county: 'Taita Taveta County',
        emoji: '🦁',
        colorFrom: '#4A2D8C',
        colorTo: '#2D1A6E',
        desc: 'Tsavo East and West bracket the Taita Hills — a dramatic highland sanctuary rising from savannah plains, with endemic birds found nowhere else.',
        tags: ['Tsavo National Park', 'Taita Hills', 'Red Elephants'],
    },
];

const fares = [
    { from: 'Mombasa',       to: 'Kilifi Town',         saloon: 'KSh 4,500',  van: 'KSh 7,000'  },
    { from: 'Mombasa',       to: 'Watamu / Malindi',    saloon: 'KSh 7,500',  van: 'KSh 12,000' },
    { from: 'Mombasa',       to: 'Diani Beach (Kwale)', saloon: 'KSh 3,500',  van: 'KSh 5,500'  },
    { from: 'Mombasa',       to: 'Lamu (via road)',     saloon: 'KSh 18,000', van: 'KSh 28,000' },
    { from: 'Mombasa',       to: 'Voi / Tsavo',         saloon: 'KSh 9,000',  van: 'KSh 14,500' },
    { from: 'Kilifi',        to: 'Watamu / Malindi',    saloon: 'KSh 4,000',  van: 'KSh 6,500'  },
    { from: 'Kilifi',        to: 'Diani Beach (Kwale)', saloon: 'KSh 7,500',  van: 'KSh 12,000' },
    { from: 'Malindi',       to: 'Lamu (via road)',     saloon: 'KSh 12,000', van: 'KSh 19,000' },
    { from: 'Diani (Kwale)', to: 'Taita Hills / Voi',   saloon: 'KSh 11,000', van: 'KSh 17,000' },
];

const testimonials = [
    {
        initials: 'AM', name: 'Amina M.', trip: 'Kilifi → Lamu Route',
        text: "Kilifi to Lamu in one smooth ride. The driver knew every stop, every shortcut. We arrived fresh, not frazzled. I'd never attempt that route without Bahari again.",
    },
    {
        initials: 'JO', name: 'James Odhiambo', trip: 'Mombasa → Diani Beach',
        text: 'Family of seven, Mombasa to Diani, spotless van with child seats already fitted. Price was exactly what was quoted — not a shilling more. Genuinely impressed.',
    },
    {
        initials: 'FK', name: 'Fatuma K.', trip: 'Mombasa → Tsavo Package',
        text: 'We booked a three-day Taita Hills and Tsavo package. Accommodation, transport, and guided game drive — all arranged in one WhatsApp conversation. Remarkable.',
    },
];

// ── Nav links ─────────────────────────────────────────────────────────────────
const navLinks: [string, string][] = [
    ['#destinations', 'Destinations'],
    ['#transport',    'Transport'],
    ['#how-it-works', 'How It Works'],
    ['#reviews',      'Reviews'],
    ['/about',        'About Us'],
];

// ── WhatsApp SVG icon ─────────────────────────────────────────────────────────
const WaIcon = ({ size = 20, color = '#fff' }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

// ── Shared styles ─────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#5A6472',
    marginBottom: '0.4rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.7rem 1rem',
    borderRadius: 10,
    border: '1.5px solid #E2E8F0',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    color: '#1A1A2E',
    background: '#F8FAFC',
    boxSizing: 'border-box',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
    const [showModal,  setShowModal]  = useState(false);
    const [formData,   setFormData]   = useState({
        full_name: '', phone: '', email: '',
        from_location: '', to_location: '',
        travel_date: '', vehicle_type: 'saloon', passengers: '1', notes: '',
    });

    const [menuOpen,   setMenuOpen]   = useState(false);
    const [fromCounty, setFromCounty] = useState('');
    const [toCounty,   setToCounty]   = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [scrolled,   setScrolled]   = useState(false);

    const assignedPhotos = useMemo(() => shufflePhotos(photoPool, destinations.length), []);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            if (window.scrollY > 40) setMenuOpen(false);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const whatsappBase = 'https://wa.me/254728769798';
    const bookingMsg = encodeURIComponent(
        `Hi, I'd like to book a trip with Bahari Tours.\nFrom: ${fromCounty || '?'}\nTo: ${toCounty || '?'}\nDate: ${travelDate || '?'}`
    );

    // ── Build formatted WhatsApp message from modal form ──────────────────────
    function handleBookingSubmit(e: React.FormEvent) {
        e.preventDefault();

        const lines = [
            `🌊 *New Booking Request — Bahari Tours*`,
            ``,
            `👤 *Name:* ${formData.full_name}`,
            `📞 *Phone:* ${formData.phone}`,
            formData.email ? `📧 *Email:* ${formData.email}` : null,
            ``,
            `📍 *From:* ${formData.from_location}`,
            `📍 *To:* ${formData.to_location}`,
            `📅 *Date:* ${formData.travel_date}`,
            `🚗 *Vehicle:* ${formData.vehicle_type === 'saloon' ? 'Saloon / 7-Seater' : '14-Seater Van'}`,
            `👥 *Passengers:* ${formData.passengers}`,
            formData.notes ? `📝 *Notes:* ${formData.notes}` : null,
        ].filter(Boolean).join('\n');

        const url = `${whatsappBase}?text=${encodeURIComponent(lines)}`;
        window.open(url, '_blank');

        setShowModal(false);
        setFormData({ full_name: '', phone: '', email: '', from_location: '', to_location: '', travel_date: '', vehicle_type: 'saloon', passengers: '1', notes: '' });
    }

    function openModal() {
        setMenuOpen(false);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setFormData({ full_name: '', phone: '', email: '', from_location: '', to_location: '', travel_date: '', vehicle_type: 'saloon', passengers: '1', notes: '' });
    }

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", color: '#1A1A2E', overflowX: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { overflow-x: hidden; }
                .playfair { font-family: 'Playfair Display', serif; }

                .nav {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 1rem 4%; transition: background 0.3s;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }
                .nav-scrolled { background: rgba(13,43,69,0.97) !important; }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .mobile-menu {
                    display: none;
                    position: fixed;
                    top: 64px; left: 0; right: 0;
                    background: rgba(13,43,69,0.98);
                    backdrop-filter: blur(16px);
                    z-index: 199;
                    padding: 1.5rem 6%;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    flex-direction: column;
                    gap: 0;
                    animation: slideDown 0.2s ease;
                }
                .mobile-menu.open { display: flex; }

                @keyframes scrollPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
                @keyframes waPulse {
                    0%   { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 0    rgba(37,211,102,0.4); }
                    70%  { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 14px rgba(37,211,102,0);   }
                    100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 0    rgba(37,211,102,0);   }
                }

                .dest-card {
                    border-radius: 16px; overflow: hidden;
                    border: 1px solid rgba(13,43,69,0.08);
                    transition: transform 0.25s, box-shadow 0.25s;
                    background: #fff; cursor: pointer;
                }
                .dest-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(13,43,69,0.12); }

                .card-photo { width: 100%; height: 200px; object-fit: cover; display: block; }
                .card-photo-wrap { position: relative; height: 200px; overflow: hidden; }
                .card-county-badge {
                    position: absolute; bottom: 1rem; left: 1rem;
                    background: rgba(0,0,0,0.42); backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.25); color: #fff;
                    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
                    text-transform: uppercase; padding: 0.3rem 0.75rem; border-radius: 2rem;
                }

                .price-row:hover td { background: rgba(255,255,255,0.04); }

                .step-card {
                    background: #fff; border-radius: 16px; padding: 2rem 1.5rem;
                    border: 1px solid rgba(13,43,69,0.06);
                }
                .t-card {
                    background: #EAF3F0; border-radius: 16px; padding: 1.8rem;
                    border: 1px solid rgba(45,106,79,0.1);
                }

                .book-input, .book-select {
                    flex: 1; min-width: 160px; padding: 0.85rem 1.2rem; border-radius: 2rem;
                    border: 1.5px solid rgba(255,255,255,0.2);
                    background: rgba(255,255,255,0.1); color: #fff;
                    font-size: 0.9rem; outline: none; font-family: 'Inter', sans-serif;
                    backdrop-filter: blur(8px); transition: border-color 0.2s;
                }
                .book-input::placeholder { color: rgba(255,255,255,0.5); }
                .book-select option { background: #0D2B45; color: #fff; }
                .book-input:focus, .book-select:focus { border-color: rgba(255,255,255,0.5); }

                .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
                .btn-ghost:hover   { background: rgba(255,255,255,0.08) !important; }
                .book-btn:hover    { opacity: 0.9; transform: translateY(-2px); }
                .wa-submit-btn:hover { opacity: 0.9; transform: translateY(-2px); }

                @media (max-width: 768px) {
                    .nav-links { display: none !important; }
                    .hamburger { display: flex !important; }
                    .footer-grid { grid-template-columns: 1fr 1fr !important; }
                    .stats-strip { flex-wrap: wrap; }
                    .stat { min-width: 120px; border-right: none !important; border-bottom: 1px solid rgba(13,43,69,0.1); padding: 1rem; }
                    .price-table-wrap { overflow-x: auto; }
                }
                @media (max-width: 480px) {
                    .footer-grid { grid-template-columns: 1fr !important; }
                    .hero-actions { flex-direction: column; }
                }
            `}</style>

            {/* ── NAV ── */}
            <nav className={`nav${scrolled ? ' nav-scrolled' : ''}`}
                style={{ background: scrolled ? undefined : 'rgba(13,43,69,0.92)', backdropFilter: 'blur(12px)' }}>

                <a href="/" className="playfair"
                    style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', textDecoration: 'none' }}>
                    Bahari<span style={{ color: '#E8633A' }}>.</span>Tours
                </a>

                <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
                    {navLinks.map(([href, label]) => (
                        <li key={label}>
                            <a href={href}
                                style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.04em' }}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={openModal} className="btn-primary"
                        style={{ background: '#E8633A', color: '#fff', padding: '0.55rem 1.4rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                        Book a Trip
                    </button>

                    <button
                        className="hamburger"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle navigation menu"
                        style={{
                            display: 'none', flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'center', gap: 5, background: 'none', border: 'none',
                            cursor: 'pointer', padding: '0.25rem', width: 36, height: 36,
                        }}
                    >
                        <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
                        <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
                        <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
                    </button>
                </div>
            </nav>

            {/* ── MOBILE MENU ── */}
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {navLinks.map(([href, label], i) => (
                    <a
                        key={label}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '1rem',
                            fontWeight: 500,
                            textDecoration: 'none',
                            padding: '1rem 0',
                            borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                            letterSpacing: '0.02em',
                            display: 'block',
                        }}
                    >
                        {label}
                    </a>
                ))}
                <button onClick={openModal}
                    style={{ marginTop: '1.25rem', width: '100%', background: '#E8633A', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '2rem', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>
                    Book a Trip
                </button>
                <a href={whatsappBase} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
                    style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#7BC8B2', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', padding: '0.5rem 0 1rem' }}>
                    <WaIcon size={16} color="#7BC8B2" />
                    Chat on WhatsApp
                </a>
            </div>

            {/* ── HERO ── */}
            <section style={{ position: 'relative', height: '100vh', minHeight: 620, display: 'flex', alignItems: 'center', background: '#0D2B45', overflow: 'hidden' }}>
                <video autoPlay muted loop playsInline
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
                    <source src="/videos/Expolore_Kenyancoast.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,43,69,0.82) 0%, rgba(13,43,69,0.55) 50%, rgba(10,61,46,0.70) 100%)', zIndex: 1 }} />
                <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', opacity: 0.15, zIndex: 1 }} viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,100 C240,160 480,40 720,100 C960,160 1200,40 1440,100 L1440,200 L0,200 Z" fill="white" />
                    <path d="M0,140 C240,180 480,80 720,140 C960,180 1200,80 1440,140 L1440,200 L0,200 Z" fill="white" opacity="0.5" />
                </svg>
                <div style={{ position: 'relative', zIndex: 2, padding: '0 4%', maxWidth: 680, marginTop: '4rem' }}>
                    <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8633A', marginBottom: '1.2rem', borderLeft: '3px solid #E8633A', paddingLeft: '0.75rem' }}>
                        Kenya's Coastal Explorer
                    </div>
                    <h1 className="playfair" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 900, lineHeight: 1.08, color: '#fff', marginBottom: '1.4rem' }}>
                        Where the <em style={{ color: '#7BC8B2' }}>Indian Ocean</em> Tells Its Story
                    </h1>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', maxWidth: 520, marginBottom: '2.4rem' }}>
                        From Lamu's ancient dhow harbours to Diani's bleached shores — we carry you through Kilifi, Kwale, Lamu, Mombasa, Taita Taveta, and Malindi with care, comfort, and local knowledge.
                    </p>
                    <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button onClick={openModal} className="btn-primary"
                            style={{ background: '#E8633A', color: '#fff', padding: '0.85rem 2rem', borderRadius: '2rem', fontWeight: 600, fontSize: '0.95rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(232,99,58,0.4)' }}>
                            Plan My Journey
                        </button>
                        <a href="#destinations" className="btn-ghost"
                            style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', padding: '0.85rem 2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s' }}>
                            Explore Destinations
                        </a>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', zIndex: 2 }}>
                    <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
                    Scroll
                </div>
            </section>

            {/* ── STATS ── */}
            <div className="stats-strip" style={{ background: '#F7F0E3', padding: '2.5rem 4%', display: 'flex', justifyContent: 'center' }}>
                {[['6+', 'Coastal Counties'], ['12+', 'Curated Routes'], ['24/7', 'Trip Support'], ['100%', 'Fixed Pricing']].map(([num, label]) => (
                    <div className="stat" key={label} style={{ flex: 1, maxWidth: 200, textAlign: 'center', padding: '0 1.5rem', borderRight: '1px solid rgba(13,43,69,0.12)' }}>
                        <div className="playfair" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0D2B45' }}>{num}</div>
                        <div style={{ fontSize: '0.78rem', color: '#5A6472', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* ── DESTINATIONS ── */}
            <section id="destinations" style={{ padding: '5rem 4%', background: '#fff' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8633A', marginBottom: '0.75rem' }}>Six Counties, Endless Stories</div>
                <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#0D2B45', marginBottom: '1rem' }}>Where Would You Like to Go?</h2>
                <p style={{ color: '#5A6472', fontSize: '0.975rem', lineHeight: 1.7, maxWidth: 520, marginBottom: '3rem' }}>
                    Every county along Kenya's coast holds its own world. We move between all six so you never have to wonder how you'll get there.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {destinations.map((d, i) => (
                        <div key={d.name} className="dest-card">
                            <div className="card-photo-wrap">
                                <img
                                    src={assignedPhotos[i]}
                                    alt={d.name}
                                    className="card-photo"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        target.style.display = 'none';
                                        const wrap = target.parentElement!;
                                        wrap.style.background = `linear-gradient(160deg, ${d.colorFrom}, ${d.colorTo})`;
                                        const emoji = document.createElement('div');
                                        emoji.textContent = d.emoji;
                                        emoji.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3.5rem;';
                                        wrap.appendChild(emoji);
                                    }}
                                />
                                <span className="card-county-badge">{d.county}</span>
                            </div>
                            <div style={{ padding: '1.4rem' }}>
                                <div className="playfair" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0D2B45', marginBottom: '0.4rem' }}>{d.name}</div>
                                <div style={{ fontSize: '0.875rem', color: '#5A6472', lineHeight: 1.65, marginBottom: '1rem' }}>{d.desc}</div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {d.tags.map(t => (
                                        <span key={t} style={{ background: '#EAF3F0', color: '#2D6A4F', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.65rem', borderRadius: '2rem' }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TRANSPORT PRICING ── */}
            <section id="transport" style={{ padding: '5rem 4%', background: '#0D2B45', color: '#fff' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7BC8B2', marginBottom: '0.75rem' }}>Transparent Fares, No Surprises</div>
                <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Transport Between Counties</h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.975rem', lineHeight: 1.7, maxWidth: 520, marginBottom: '3rem' }}>
                    All prices are per vehicle, per one-way trip. Group sizes and return journeys quoted separately.
                </p>
                <div className="price-table-wrap">
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.05)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <thead>
                            <tr style={{ background: 'rgba(232,99,58,0.2)' }}>
                                {['From', 'To', 'Saloon / 7-Seater', '14-Seater Van'].map(h => (
                                    <th key={h} style={{ padding: '1rem 1.2rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fares.map((f, i) => (
                                <tr key={i} className="price-row">
                                    <td style={{ padding: '1rem 1.2rem', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 600, color: '#fff' }}>{f.from}</td>
                                    <td style={{ padding: '1rem 1.2rem', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)' }}>{f.to}</td>
                                    <td style={{ padding: '1rem 1.2rem', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 700, color: '#7BC8B2', fontFamily: 'Playfair Display, serif' }}>{f.saloon}</td>
                                    <td style={{ padding: '1rem 1.2rem', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 700, color: '#E8633A', fontFamily: 'Playfair Display, serif' }}>{f.van}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(123,200,178,0.1)', border: '1px solid rgba(123,200,178,0.25)', borderRadius: 12, fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                    <strong style={{ color: '#7BC8B2' }}>Note:</strong> Prices are for the full vehicle, not per person. All transport includes a professional driver. Fuel and tolls included. Airport pickups and multi-day hire available — <strong style={{ color: '#7BC8B2' }}>contact us for a custom quote</strong>.
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section id="how-it-works" style={{ padding: '5rem 4%', background: '#F7F0E3' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8633A', marginBottom: '0.75rem' }}>Simple From Start to Shore</div>
                <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#0D2B45', marginBottom: '1rem' }}>How Booking Works</h2>
                <p style={{ color: '#5A6472', fontSize: '0.975rem', lineHeight: 1.7, maxWidth: 520, marginBottom: '3rem' }}>Three steps from your screen to your destination.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                    {[
                        { num: '01', icon: '🗺️', title: 'Choose Your Route', desc: 'Browse destinations and transport options. Pick your county pair and preferred travel date — we confirm availability within the hour.' },
                        { num: '02', icon: '💬', title: 'Talk to Our Team', desc: 'Reach us on WhatsApp or via our booking form. A real advisor walks you through pricing, vehicle options, and add-ons.' },
                        { num: '03', icon: '🤝', title: 'Confirm & Relax', desc: 'Pay a deposit to secure your spot. We send a confirmation with driver details, pickup time, and your full itinerary.' },
                        { num: '04', icon: '🌊', title: 'Travel the Coast', desc: "Your driver arrives on time, vehicle is clean and air-conditioned. We're reachable throughout your journey." },
                    ].map(s => (
                        <div key={s.num} className="step-card">
                            <div className="playfair" style={{ fontSize: '3rem', fontWeight: 900, color: '#E8633A', opacity: 0.18, lineHeight: 1 }}>{s.num}</div>
                            <div style={{ fontSize: '1.8rem', margin: '0.75rem 0' }}>{s.icon}</div>
                            <h3 className="playfair" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0D2B45', marginBottom: '0.5rem' }}>{s.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: '#5A6472', lineHeight: 1.65 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section id="reviews" style={{ padding: '5rem 4%', background: '#fff' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8633A', marginBottom: '0.75rem' }}>From Travellers Who've Been</div>
                <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#0D2B45', marginBottom: '1rem' }}>What Our Guests Say</h2>
                <p style={{ color: '#5A6472', fontSize: '0.975rem', lineHeight: 1.7, maxWidth: 520, marginBottom: '3rem' }}>Honest words from people who trusted us with their coastal journeys.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {testimonials.map(t => (
                        <div key={t.name} className="t-card">
                            <div style={{ color: '#F5A623', fontSize: '0.9rem', marginBottom: '0.75rem' }}>★★★★★</div>
                            <p style={{ fontSize: '0.9rem', color: '#1A1A2E', lineHeight: 1.7, marginBottom: '1.2rem', fontStyle: 'italic' }}>"{t.text}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0D2B45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#fff', fontSize: '1rem', flexShrink: 0 }}>{t.initials}</div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0D2B45' }}>{t.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#5A6472' }}>{t.trip}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── BOOKING CTA ── */}
            <section id="booking" style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #0D2B45 100%)', textAlign: 'center', padding: '6rem 4%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7BC8B2', marginBottom: '0.75rem' }}>Ready When You Are</div>
                    <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Start Planning Your Trip</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 auto 2.5rem', maxWidth: 500, fontSize: '0.975rem', lineHeight: 1.7 }}>
                        Tell us where you're heading and we'll get back to you with options, pricing, and availability — usually within the hour.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', maxWidth: 680, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <select className="book-select" value={fromCounty} onChange={e => setFromCounty(e.target.value)}>
                            <option value="" disabled>From (County)</option>
                            {['Mombasa', 'Kilifi', 'Kwale / Diani', 'Lamu', 'Malindi', 'Taita Taveta'].map(c => <option key={c}>{c}</option>)}
                        </select>
                        <select className="book-select" value={toCounty} onChange={e => setToCounty(e.target.value)}>
                            <option value="" disabled>To (Destination)</option>
                            {['Kilifi / Watamu', 'Mombasa City', 'Diani Beach', 'Lamu Old Town', 'Malindi', 'Tsavo / Taita Hills'].map(c => <option key={c}>{c}</option>)}
                        </select>
                        <input className="book-input" type="date" value={travelDate} onChange={e => setTravelDate(e.target.value)} style={{ flex: 1, minWidth: 160 }} />
                        <a href={`${whatsappBase}?text=${bookingMsg}`} target="_blank" rel="noreferrer" className="book-btn"
                            style={{ background: '#25D366', color: '#fff', padding: '0.85rem 2.2rem', borderRadius: '2rem', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <WaIcon size={18} />
                            Book via WhatsApp
                        </a>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '1.5rem 0 0.75rem' }}>— or fill in a detailed form —</div>
                    <button onClick={openModal}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff', padding: '0.7rem 1.8rem', borderRadius: '2rem', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                        Open Booking Form
                    </button>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: '#07192B', color: 'rgba(255,255,255,0.6)', padding: '4rem 4% 2rem' }}>
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <div className="playfair" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Bahari<span style={{ color: '#E8633A' }}>.</span>Tours</div>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 280 }}>Kenya's coastal touring company, connecting the six counties of the coast with reliable transport and unforgettable guided experiences.</p>
                    </div>
                    {[
                        { title: 'Destinations', links: ['Kilifi & Watamu', 'Mombasa City', 'Diani Beach', 'Lamu Old Town', 'Malindi', 'Tsavo & Taita Hills'] },
                        { title: 'Company',      links: ['About Us', 'Our Vehicles', 'Packages', 'Travel Policies', 'FAQ'] },
                        { title: 'Contact',      links: ['+254 728 769 798', 'hello@baharitourskenya.com', 'Kilifi Town, Kenya', 'WhatsApp Us'] },
                    ].map(col => (
                        <div key={col.title}>
                            <h4 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>{col.title}</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {col.links.map(l => (
                                    <li key={l} style={{ marginBottom: '0.5rem' }}>
                                        <a
                                            href={l === 'About Us' ? '/about' : l === 'WhatsApp Us' ? whatsappBase : '#'}
                                            target={l === 'WhatsApp Us' ? '_blank' : undefined}
                                            rel={l === 'WhatsApp Us' ? 'noreferrer' : undefined}
                                            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', textDecoration: 'none' }}
                                        >
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
                    <span>© 2026 Bahari Tours & Adventures. All rights reserved.</span>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {['Privacy Policy', 'Terms of Service', 'Booking Policy'].map(l => (
                            <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.825rem' }}>{l}</a>
                        ))}
                        <a href="/admin/bookings" style={{ color: 'rgba(255,255,255,0.15)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em' }}>
                            Admin
                        </a>
                    </div>
                </div>
            </footer>

            {/* ── BOOKING MODAL ── */}
            {showModal && (
                <div onClick={closeModal}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(13,43,69,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
                    <div onClick={e => e.stopPropagation()}
                        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(13,43,69,0.25)' }}>

                        {/* Modal header */}
                        <div style={{ background: 'linear-gradient(135deg, #0D2B45, #2D6A4F)', padding: '1.75rem 2rem 1.5rem', borderRadius: '20px 20px 0 0', position: 'relative' }}>
                            <button onClick={closeModal}
                                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                ✕
                            </button>
                            <div className="playfair" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: '0.25rem' }}>Book Your Trip</div>
                            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>Fill in your details and send directly to our WhatsApp.</div>
                        </div>

                        {/* Modal form */}
                        <div style={{ padding: '1.75rem 2rem' }}>
                            <form onSubmit={handleBookingSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={labelStyle}>Full Name *</label>
                                        <input style={inputStyle} type="text" placeholder="e.g. Amina Mohamed" required
                                            value={formData.full_name} onChange={e => setFormData(p => ({ ...p, full_name: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Phone *</label>
                                        <input style={inputStyle} type="tel" placeholder="07XX XXX XXX" required
                                            value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Email</label>
                                        <input style={inputStyle} type="email" placeholder="Optional"
                                            value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>From *</label>
                                        <select style={inputStyle} required value={formData.from_location}
                                            onChange={e => setFormData(p => ({ ...p, from_location: e.target.value }))}>
                                            <option value="">Select county</option>
                                            {['Mombasa', 'Kilifi', 'Kwale / Diani', 'Lamu', 'Malindi', 'Taita Taveta'].map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>To *</label>
                                        <select style={inputStyle} required value={formData.to_location}
                                            onChange={e => setFormData(p => ({ ...p, to_location: e.target.value }))}>
                                            <option value="">Select destination</option>
                                            {['Kilifi / Watamu', 'Mombasa City', 'Diani Beach', 'Lamu Old Town', 'Malindi', 'Tsavo / Taita Hills'].map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Travel Date *</label>
                                        <input style={inputStyle} type="date" required value={formData.travel_date}
                                            onChange={e => setFormData(p => ({ ...p, travel_date: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Vehicle</label>
                                        <select style={inputStyle} value={formData.vehicle_type}
                                            onChange={e => setFormData(p => ({ ...p, vehicle_type: e.target.value }))}>
                                            <option value="saloon">Saloon / 7-Seater</option>
                                            <option value="van">14-Seater Van</option>
                                        </select>
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={labelStyle}>Passengers</label>
                                        <input style={inputStyle} type="number" min={1} max={14}
                                            value={formData.passengers} onChange={e => setFormData(p => ({ ...p, passengers: e.target.value }))} />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={labelStyle}>Notes</label>
                                        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                                            placeholder="Any special requests, pickup point, etc."
                                            value={formData.notes} onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))} />
                                    </div>
                                </div>

                                {/* WhatsApp submit button */}
                                <button type="submit" className="wa-submit-btn"
                                    style={{
                                        width: '100%',
                                        background: '#25D366',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '0.9rem',
                                        borderRadius: '2rem',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.6rem',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
                                    }}>
                                    <WaIcon size={20} />
                                    Send Booking via WhatsApp
                                </button>

                                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.5 }}>
                                    WhatsApp will open with your details pre-filled. Our team confirms within the hour.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ── WHATSAPP FLOAT ── */}
            <a
                href={whatsappBase}
                target="_blank"
                rel="noreferrer"
                title="Chat with us on WhatsApp"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 999,
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'waPulse 2s ease-in-out infinite',
                    transition: 'transform 0.2s',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)'; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; }}
            >
                <WaIcon size={28} />
            </a>
        </div>
    );
}