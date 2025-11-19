import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLayoutStore } from '../../store/layoutStore';
import { useCommandStore } from '../../store/commandStore';
import { useNavigationStore } from '../../store/navigationStore';

const CommandPalette: React.FC = () => {
    const { isOpen, close, query, setQuery, toggle } = useCommandStore();
    const { toggleInsightRibbon, toggleRightRail } = useLayoutStore();
    const { navigate } = useNavigationStore();
    const inputRef = useRef<HTMLInputElement>(null);

    // ... (useEffect hooks remain same)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggle();
            }
            if (e.key === 'Escape' && isOpen) {
                close();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, toggle, close]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };

    // Mock commands for now
    const commands = [
        { id: '1', label: 'Go to Today', action: () => navigate('today') },
        { id: '2', label: 'Go to Customers', action: () => navigate('customers') },
        { id: '3', label: 'Go to Work', action: () => navigate('work') },
        { id: '4', label: 'Go to Systems', action: () => navigate('systems') },
        { id: '5', label: 'Toggle Insight Ribbon', action: () => toggleInsightRibbon() },
        { id: '6', label: 'Toggle Right Rail', action: () => toggleRightRail() },
    ].filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()));

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '15vh'
            }}
            onClick={handleOverlayClick}
        >
            <div
                className="glass-panel"
                style={{
                    width: '600px',
                    maxWidth: '90vw',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-glass)',
                    animation: 'fadeIn 0.1s ease-out'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--space-4)',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    <Search size={20} color="var(--color-text-secondary)" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a command or search..."
                        style={{
                            flex: 1,
                            border: 'none',
                            background: 'transparent',
                            marginLeft: 'var(--space-3)',
                            fontSize: 'var(--text-body)',
                            color: 'var(--color-text-main)',
                            outline: 'none'
                        }}
                    />
                    <button onClick={close} className="btn btn-ghost" style={{ padding: 'var(--space-1)' }}>
                        <X size={18} />
                    </button>
                </div>

                <div style={{ maxHeight: '300px', overflowY: 'auto', padding: 'var(--space-2)' }}>
                    {commands.length > 0 ? (
                        commands.map((cmd, index) => (
                            <button
                                key={cmd.id}
                                className="btn btn-ghost"
                                onClick={() => {
                                    cmd.action();
                                    close();
                                }}
                                style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    padding: 'var(--space-3) var(--space-4)',
                                    textAlign: 'left',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                <span>{cmd.label}</span>
                                {index === 0 && query && <ArrowRight size={16} color="var(--color-text-tertiary)" />}
                            </button>
                        ))
                    ) : (
                        <div style={{ padding: 'var(--space-4)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                            No commands found
                        </div>
                    )}
                </div>

                <div style={{
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--color-bg-subtle)',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-tertiary)'
                }}>
                    <span>ProTip: Use arrows to navigate</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
