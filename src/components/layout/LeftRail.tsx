import React, { useState } from 'react';
import { LayoutDashboard, Users, Briefcase, Settings, Search, Menu, X } from 'lucide-react';
import { useNavigationStore, type PageType } from '../../store/navigationStore';
import '../../styles/index.css';

const LeftRail: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentPage, navigate } = useNavigationStore();

    const navItems: Array<{ icon: typeof LayoutDashboard; label: string; page: PageType }> = [
        { icon: LayoutDashboard, label: 'Today', page: 'today' },
        { icon: Users, label: 'Customers', page: 'customers' },
        { icon: Briefcase, label: 'Work', page: 'work' },
        { icon: Settings, label: 'Systems', page: 'systems' },
    ];

    const handleNavigate = (page: PageType) => {
        navigate(page);
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                className="btn btn-ghost hidden-desktop"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    top: 'var(--space-4)',
                    left: 'var(--space-4)',
                    zIndex: 100,
                    width: '48px',
                    height: '48px',
                    padding: 0,
                    borderRadius: 'var(--radius-lg)'
                }}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 49
                    }}
                    className="hidden-desktop"
                />
            )}

            {/* Desktop sidebar - always visible */}
            <aside
                className="glass-panel hidden-mobile"
                style={{
                    width: '88px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 'var(--space-8) 0',
                    borderRight: '1px solid var(--color-border-glass)',
                    zIndex: 50
                }}
            >
                <div style={{ marginBottom: 'var(--space-12)' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-info))',
                    }} />
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', flex: 1 }}>
                    {navItems.map((item) => {
                        const isActive = item.page === currentPage;
                        return (
                            <button
                                key={item.page}
                                onClick={() => handleNavigate(item.page)}
                                className="btn btn-ghost"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    padding: 0,
                                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                    background: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                                    borderRadius: '16px'
                                }}
                                aria-label={item.label}
                            >
                                <item.icon size={24} />
                            </button>
                        );
                    })}
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                    <button className="btn btn-ghost" style={{ width: '48px', height: '48px', padding: 0, borderRadius: '16px' }}>
                        <Search size={24} />
                    </button>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#ddd',
                        border: '2px solid var(--color-bg-surface)'
                    }} />
                </div>
            </aside>

            {/* Mobile sidebar - shows when menu is open */}
            {isOpen && (
                <aside
                    className="glass-panel hidden-desktop"
                    style={{
                        width: '88px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 'var(--space-8) 0',
                        borderRight: '1px solid var(--color-border-glass)',
                        zIndex: 50,
                        position: 'fixed',
                        left: 0,
                        top: 0
                    }}
                >
                    <div style={{ marginBottom: 'var(--space-12)' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-info))',
                        }} />
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', flex: 1 }}>
                        {navItems.map((item) => {
                            const isActive = item.page === currentPage;
                            return (
                                <button
                                    key={item.page}
                                    onClick={() => handleNavigate(item.page)}
                                    className="btn btn-ghost"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        padding: 0,
                                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                        background: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                                        borderRadius: '16px'
                                    }}
                                    aria-label={item.label}
                                >
                                    <item.icon size={24} />
                                </button>
                            );
                        })}
                    </nav>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                        <button className="btn btn-ghost" style={{ width: '48px', height: '48px', padding: 0, borderRadius: '16px' }}>
                            <Search size={24} />
                        </button>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#ddd',
                            border: '2px solid var(--color-bg-surface)'
                        }} />
                    </div>
                </aside>
            )}

            {/* Desktop spacer */}
            <div className="hidden-mobile" style={{ width: '88px', flexShrink: 0 }} />
        </>
    );
};

export default LeftRail;
