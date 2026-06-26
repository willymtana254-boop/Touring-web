import { Head } from '@inertiajs/react';

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
        `Hi, I just booked with Bahari Tours.\nRef: ${booking.reference}\nFrom: ${booking.from_location} to ${booking.to_location} on ${booking.travel_date}.`
    );

    return (
        <>
            <Head title="Booking Confirmed – Bahari Tours" />
            <div style={{ minHeight: '100vh', background: '#F7F0E3', fontFamily: 'Inter, sans-serif' }}>
                <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 4%', background: 'rgba(13,43,69,0.97)' }}>
                    <a href="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 900, color: '#fff', textDecoration: 'none' }}>
                        Bahari<span style={{ color: '#E8633A' }}>.</span>Tours
                    </a>
                    <a href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textDecoration: 'none' }}>← Home</a>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '6rem 1.5rem 3rem' }}>
                    <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem 2rem', maxWidth: 520, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(13,43,69,0.1)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌊</div>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: '#0D2B45', marginBottom: '0.75rem' }}>
                            You're All Set!
                        </h1>
                        <p style={{ color: '#5A6472', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                            Your booking has been received. We'll contact you within the hour to confirm details.
                        </p>

                        <div style={{ background: 'linear-gradient(135deg, #0D2B45, #2D6A4F)', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem' }}>
                                Booking Reference
                            </div>
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 900, color: '#7BC8B2', letterSpacing: '0.05em' }}>
                                {booking.reference}
                            </div>
                        </div>

                        <div style={{ textAlign: 'left', background: '#F7F0E3', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                            {[
                                ['Name', booking.full_name],
                                ['Phone', booking.phone],
                                ['From', booking.from_location],
                                ['To', booking.to_location],
                                ['Date', booking.travel_date],
                                ['Vehicle', booking.vehicle_type === 'van' ? '14-Seater Van' : 'Saloon / 7-Seater'],
                                ['Passengers', String(booking.passengers)],
                            ].map(([label, value]) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(13,43,69,0.06)', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#5A6472' }}>{label}</span>
                                    <strong style={{ color: '#0D2B45' }}>{value}</strong>
                                </div>
                            ))}
                        </div>

                        <a
                            href={`https://wa.me/254700000000?text=${waMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#25D366', color: '#fff', padding: '0.85rem 2rem', borderRadius: '2rem', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}
                        >
                            Confirm on WhatsApp
                        </a>
                        <br />
                        <a href="/" style={{ color: '#5A6472', fontSize: '0.875rem', textDecoration: 'none' }}>← Back to Home</a>
                    </div>
                </div>
            </div>
        </>
    );
}