import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface Booking {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
    from_location: string;
    to_location: string;
    travel_date: string;
    vehicle_type: 'saloon' | 'van';
    passengers: number;
    notes: string | null;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

const statusColors: Record<string, React.CSSProperties> = {
    pending:   { background: '#FEF3C7', color: '#92400E' },
    confirmed: { background: '#D1FAE5', color: '#065F46' },
    cancelled: { background: '#FEE2E2', color: '#991B1B' },
};

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', fontWeight: 600,
    color: '#94A3B8', marginBottom: '0.4rem',
    letterSpacing: '0.1em', textTransform: 'uppercase',
};

export default function AdminBookings({ bookings }: { bookings: Booking[] }) {
    const [search, setSearch]             = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const counts = {
        all:       bookings.length,
        pending:   bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };

    const filtered = bookings.filter(b => {
        const q = search.toLowerCase();
        const matchSearch =
            b.full_name.toLowerCase().includes(q) ||
            b.phone.includes(q) ||
            b.from_location.toLowerCase().includes(q) ||
            b.to_location.toLowerCase().includes(q);
        const matchStatus = statusFilter === 'all' || b.status === statusFilter;
        return matchSearch && matchStatus;
    });

    function changeStatus(booking: Booking, status: string) {
        router.patch(`/admin/bookings/${booking.id}/status`, { status }, { preserveScroll: true });
    }

    function deleteBooking(booking: Booking) {
        if (!confirm(`Delete booking for ${booking.full_name}?`)) return;
        router.delete(`/admin/bookings/${booking.id}`, { preserveScroll: true });
    }

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F8FAFC', color: '#1A1A2E' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                .playfair { font-family: 'Playfair Display', serif; }
                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th {
                    background: #0D2B45; color: rgba(255,255,255,0.75);
                    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em;
                    text-transform: uppercase; padding: 0.85rem 1rem; text-align: left;
                }
                .admin-table td {
                    padding: 0.9rem 1rem; border-bottom: 1px solid #F1F5F9;
                    font-size: 0.875rem; vertical-align: middle;
                }
                .admin-table tbody tr:hover td { background: #F8FAFC; }
                .notes-row td { background: #FAFAFA !important; padding: 0.4rem 1rem 0.75rem !important; }
                .status-select {
                    border: none; border-radius: 2rem; padding: 0.3rem 0.75rem;
                    font-size: 0.75rem; font-weight: 600; cursor: pointer; outline: none;
                }
                .action-btn {
                    border: none; background: none; cursor: pointer;
                    padding: 0.4rem 0.75rem; border-radius: 6px;
                    font-size: 0.8rem; font-weight: 500; transition: background 0.15s;
                }
                .delete-btn { color: #EF4444; }
                .delete-btn:hover { background: #FEE2E2; color: #991B1B; }
                input, select { font-family: 'Inter', sans-serif; }
                .stat-card {
                    background: #fff; border-radius: 12px;
                    padding: 1.25rem 1.5rem; border: 1px solid #E2E8F0;
                }
                .filter-btn {
                    padding: 0.4rem 1rem; border-radius: 2rem;
                    border: 1.5px solid #E2E8F0; background: #fff;
                    font-size: 0.8rem; font-weight: 500; cursor: pointer;
                    transition: all 0.15s; color: #5A6472;
                }
                .filter-btn.active { background: #0D2B45; color: #fff; border-color: #0D2B45; }
                @media (max-width: 768px) { .admin-table-wrap { overflow-x: auto; } }
            `}</style>

            {/* ── HEADER ── */}
            <div style={{ background: '#0D2B45', padding: '1.5rem 4%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div className="playfair" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>
                        Bahari<span style={{ color: '#E8633A' }}>.</span>Tours
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Admin — Bookings
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a href="/"
                        style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2rem' }}>
                        ← View Site
                    </a>
                    <a href="/admin/bookings/export"
                        style={{ background: '#E8633A', color: '#fff', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', padding: '0.5rem 1.2rem', borderRadius: '2rem' }}>
                        Export CSV
                    </a>
                </div>
            </div>

            <div style={{ padding: '2rem 4%' }}>

                {/* ── STAT CARDS ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {([
                        { label: 'Total',     value: counts.all,       color: '#0D2B45' },
                        { label: 'Pending',   value: counts.pending,   color: '#92400E' },
                        { label: 'Confirmed', value: counts.confirmed, color: '#065F46' },
                        { label: 'Cancelled', value: counts.cancelled, color: '#991B1B' },
                    ] as const).map(s => (
                        <div key={s.label} className="stat-card">
                            <div style={labelStyle}>{s.label}</div>
                            <div className="playfair" style={{ fontSize: '2rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* ── FILTERS ── */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Search name, phone, route…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ padding: '0.6rem 1rem', borderRadius: '2rem', border: '1.5px solid #E2E8F0', fontSize: '0.875rem', outline: 'none', minWidth: 240 }}
                    />
                    {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(s => (
                        <button
                            key={s}
                            className={`filter-btn${statusFilter === s ? ' active' : ''}`}
                            onClick={() => setStatusFilter(s)}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}&nbsp;({counts[s]})
                        </button>
                    ))}
                </div>

                {/* ── TABLE ── */}
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    {['#', 'Name & Contact', 'Route', 'Date', 'Vehicle', 'Pax', 'Status', 'Actions'].map(h => (
                                        <th key={h}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                                            No bookings found.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(b => (
                                        <>
                                            <tr key={b.id}>
                                                <td style={{ color: '#94A3B8', fontWeight: 600 }}>#{b.id}</td>
                                                <td>
                                                    <div style={{ fontWeight: 600, color: '#0D2B45' }}>{b.full_name}</div>
                                                    <div style={{ fontSize: '0.78rem', color: '#5A6472' }}>{b.phone}</div>
                                                    {b.email && (
                                                        <div style={{ fontSize: '0.78rem', color: '#5A6472' }}>{b.email}</div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div style={{ fontWeight: 500 }}>{b.from_location}</div>
                                                    <div style={{ fontSize: '0.78rem', color: '#5A6472' }}>→ {b.to_location}</div>
                                                </td>
                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                    {new Date(b.travel_date).toLocaleDateString('en-KE', {
                                                        day: 'numeric', month: 'short', year: 'numeric',
                                                    })}
                                                </td>
                                                <td style={{ textTransform: 'capitalize' }}>{b.vehicle_type}</td>
                                                <td>{b.passengers}</td>
                                                <td>
                                                    <select
                                                        className="status-select"
                                                        value={b.status}
                                                        onChange={e => changeStatus(b, e.target.value)}
                                                        style={statusColors[b.status]}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button
                                                        className="action-btn delete-btn"
                                                        onClick={() => deleteBooking(b)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Notes row — only renders when notes exist */}
                                            {b.notes && (
                                                <tr key={`${b.id}-notes`} className="notes-row">
                                                    <td colSpan={8}>
                                                        <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontStyle: 'italic' }}>
                                                            📝 {b.notes}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: '#94A3B8' }}>
                    Showing {filtered.length} of {bookings.length} bookings
                </div>
            </div>
        </div>
    );
}