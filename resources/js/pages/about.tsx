import { useEffect, useState } from 'react';

const whyChooseUs = [
    {
        icon: '🗺️',
        title: 'Local Knowledge, Not Guesswork',
        desc: 'We grew up on this coast. Every route we run, every stop we recommend, every shortcut we know — comes from years of living here, not reading about it.',
    },
    {
        icon: '💰',
        title: 'Fixed Prices, No Surprises',
        desc: 'The price you see is the price you pay. No haggling at pickup, no hidden fuel surcharges, no "traffic fees" invented on the way. One quote, one payment.',
    },
    {
        icon: '🚗',
        title: 'Clean, Reliable Vehicles',
        desc: 'Our fleet is regularly serviced and inspected. Air-conditioned interiors, working seatbelts, and a driver who actually knows where he\'s going.',
    },
    {
        icon: '📱',
        title: 'One Conversation, Everything Sorted',
        desc: 'Transport, accommodation recommendations, itinerary advice — we handle it over WhatsApp. No forms, no call centres, no waiting on hold.',
    },
    {
        icon: '⏱️',
        title: 'On Time, Every Time',
        desc: 'We track tides, ferry schedules, and traffic patterns so your pickup time is realistic. We\'d rather leave early than have you miss a connection.',
    },
    {
        icon: '🌊',
        title: 'Six Counties, One Team',
        desc: 'Most operators cover one or two routes. We move across all six coastal counties — Mombasa, Kilifi, Kwale, Lamu, Taita Taveta, and Malindi — with the same reliability.',
    },
];

const stats = [
    { num: '6+',   label: 'Counties Covered' },
    { num: '12+',  label: 'Curated Routes' },
    { num: '24/7', label: 'Trip Support' },
    { num: '100%', label: 'Fixed Pricing' },
];

export default function About() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
                    background: rgba(13,43,69,0.97);
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    backdrop-filter: blur(12px);
                }

                .why-card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 2rem 1.75rem;
                    border: 1px solid rgba(13,43,69,0.07);
                    transition: transform 0.25s, box-shadow 0.25s;
                }
                .why-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 32px rgba(13,43,69,0.10);
                }

                .stat-pill {
                    text-align: center;
                    padding: 2rem 1rem;
                    border-right: 1px solid rgba(255,255,255,0.12);
                    flex: 1;
                }
                .stat-pill:last-child { border-right: none; }

                .btn-primary { transition: all 0.2s; }
                .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
                .btn-ghost:hover { background: rgba(255,255,255,0.08) !important; }

                @media (max-width: 768px) {
                    .nav-links { display: none !important; }
                    .about-hero-grid { flex-direction: column !important; }
                    .stats-row { flex-wrap: wrap; }
                    .stat-pill { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.12); min-width: 140px; }
                    .stat-pill:last-child { border-bottom: none; }
                    .story-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 480px) {
                    .why-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── NAV ── */}
            <nav className="nav">
                <a href="/" className="playfair"
                    style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', textDecoration: 'none' }}>
                    Bahari<span style={{ color: '#E8633A' }}>.</span>Tours
                </a>
                <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
                    {[['/', 'Home'], ['/about', 'About'], ['/#destinations', 'Destinations'], ['/#transport', 'Transport']].map(([href, label]) => (
                        <li key={label}>
                            <a href={href}
                                style={{
                                    color: label === 'About' ? '#fff' : 'rgba(255,255,255,0.65)',
                                    fontWeight: label === 'About' ? 600 : 400,
                                    fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.04em',
                                    borderBottom: label === 'About' ? '2px solid #E8633A' : 'none',
                                    paddingBottom: '2px',
                                }}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a href="/#booking"
                    style={{ background: '#E8633A', color: '#fff', padding: '0.55rem 1.4rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
                    Book a Trip
                </a>
            </nav>

            {/* ── HERO ── */}
            <section style={{ background: 'linear-gradient(135deg, #0D2B45 0%, #1A4B3A 100%)', paddingTop: '9rem', paddingBottom: '6rem', paddingLeft: '4%', paddingRight: '4%', position: 'relative', overflow: 'hidden' }}>
                {/* Background pattern */}
                <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(123,200,178,0.05)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -80, left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(232,99,58,0.05)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 680, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8633A', marginBottom: '1.2rem', borderLeft: '3px solid #E8633A', paddingLeft: '0.75rem' }}>
                        About Bahari Tours
                    </div>
                    <h1 className="playfair" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: '1.4rem' }}>
                        We Know This Coast <em style={{ color: '#7BC8B2' }}>Like Home</em>
                    </h1>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)', maxWidth: 540 }}>
                        Because it is. Bahari Tours was built by people who live, work, and travel along Kenya's six coastal counties every day — not by a corporate office somewhere inland.
                    </p>
                </div>
            </section>

            {/* ── STATS STRIP ── */}
            <div style={{ background: '#0D2B45' }}>
                <div className="stats-row" style={{ display: 'flex', justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
                    {stats.map(s => (
                        <div key={s.label} className="stat-pill">
                            <div className="playfair" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#7BC8B2' }}>{s.num}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── OUR STORY ── */}
            <section style={{ padding: '6rem 4%', background: '#fff' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

                        {/* Text */}
                        <div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8633A', marginBottom: '0.75rem' }}>Our Story</div>
                            <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 800, color: '#0D2B45', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                                Born from the Coast, Built for the Coast
                            </h2>
                            <p style={{ fontSize: '0.975rem', color: '#5A6472', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                                Bahari Tours started with a simple frustration — visitors to Kenya's coast had no reliable way to travel between counties. Matatus were unpredictable, private hire was overpriced and opaque, and tour operators bundled transport into expensive packages that didn't fit what most travellers actually needed.
                            </p>
                            <p style={{ fontSize: '0.975rem', color: '#5A6472', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                                We set out to fix that. One fixed price, one professional driver, one vehicle — whether you're moving a family of seven from Mombasa to Diani, or a solo traveller heading up to Lamu for a week. No middlemen, no surprises.
                            </p>
                            <p style={{ fontSize: '0.975rem', color: '#5A6472', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Today we operate across all six coastal counties — Mombasa, Kilifi, Kwale, Lamu, Taita Taveta, and Malindi — with a growing fleet and a team that genuinely loves this stretch of coastline.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <a href="/#booking"
                                    style={{ background: '#E8633A', color: '#fff', padding: '0.8rem 1.8rem', borderRadius: '2rem', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(232,99,58,0.35)' }}>
                                    Book a Trip
                                </a>
                                <a href="https://wa.me/254728769798" target="_blank" rel="noreferrer"
                                    style={{ border: '1.5px solid rgba(13,43,69,0.2)', color: '#0D2B45', padding: '0.8rem 1.8rem', borderRadius: '2rem', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>
                                    Chat With Us
                                </a>
                            </div>
                        </div>

                        {/* Visual card */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ background: 'linear-gradient(160deg, #0D2B45, #2D6A4F)', borderRadius: 20, padding: '3rem 2.5rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(123,200,178,0.08)' }} />
                                <div style={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(232,99,58,0.08)' }} />
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🌊</div>
                                    <div className="playfair" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>
                                        "Bahari" means <em>Ocean</em> in Swahili.
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
                                        The name is intentional. The Indian Ocean connects everything on this coast — the cultures, the trade routes, the communities. We see ourselves the same way: a connector.
                                    </p>
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {[
                                            '✦  Kilifi-based, coast-focused',
                                            '✦  Professional licensed drivers',
                                            '✦  Fixed, transparent pricing',
                                            '✦  All six coastal counties',
                                        ].map(item => (
                                            <div key={item} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>{item}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ── */}
            <section style={{ padding: '6rem 4%', background: '#F7F0E3' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8633A', marginBottom: '0.75rem' }}>Why Choose Us</div>
                    <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 800, color: '#0D2B45', marginBottom: '1rem' }}>What Makes Bahari Different</h2>
                    <p style={{ color: '#5A6472', fontSize: '0.975rem', lineHeight: 1.7, maxWidth: 520, marginBottom: '3.5rem' }}>
                        There are many ways to get around the coast. Here's why travellers keep coming back to us.
                    </p>
                    <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {whyChooseUs.map(w => (
                            <div key={w.title} className="why-card">
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{w.icon}</div>
                                <h3 className="playfair" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0D2B45', marginBottom: '0.6rem' }}>{w.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: '#5A6472', lineHeight: 1.7 }}>{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MISSION STATEMENT ── */}
            <section style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #0D2B45 100%)', padding: '6rem 4%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7BC8B2', marginBottom: '0.75rem' }}>Our Mission</div>
                    <h2 className="playfair" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                        Make the Kenyan Coast <em style={{ color: '#7BC8B2' }}>Accessible</em> to Everyone
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                        We believe the beauty of this coastline — the reefs, the ruins, the fishing towns, the forest reserves — should not be locked behind confusing logistics. Our job is to get you there safely, on time, and at a price you agreed to before you got in the car.
                    </p>
                    <a href="https://wa.me/254728769798" target="_blank" rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#E8633A', color: '#fff', padding: '0.9rem 2.2rem', borderRadius: '2rem', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(232,99,58,0.45)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Start Planning Your Trip
                    </a>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: '#07192B', color: 'rgba(255,255,255,0.6)', padding: '3rem 4%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
                    <div className="playfair" style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>
                        Bahari<span style={{ color: '#E8633A' }}>.</span>Tours
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</a>
                        <a href="/#destinations" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Destinations</a>
                        <a href="/#transport" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Transport</a>
                        <a href="https://wa.me/254728769798" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>WhatsApp Us</a>
                    </div>
                    <span>© 2026 Bahari Tours & Adventures.</span>
                </div>
            </footer>
        </div>
    );
}