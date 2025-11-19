import React from 'react';
import { format } from 'date-fns';

const TimeGrid: React.FC = () => {
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM
    const currentTime = new Date();

    return (
        <div className="glass-panel" style={{
            flex: 1,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)'
            }}>
                <h3 className="text-h3">Time Grid</h3>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {format(currentTime, 'EEEE, MMMM do')}
                </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', paddingRight: 'var(--space-2)' }}>
                {hours.map((hour) => (
                    <div key={hour} style={{
                        display: 'flex',
                        height: '80px',
                        borderBottom: '1px solid var(--color-border-subtle)',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '50px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-tertiary)',
                            paddingTop: 'var(--space-2)',
                            textAlign: 'right',
                            paddingRight: 'var(--space-2)'
                        }}>
                            {hour}:00
                        </div>
                        <div style={{ flex: 1, position: 'relative', borderLeft: '1px dashed var(--color-border-subtle)' }}>
                            {/* Grid Lines */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                right: 0,
                                borderTop: '1px dotted var(--color-border-subtle)',
                                opacity: 0.5
                            }} />

                            {/* Mock Blocks */}
                            {hour === 9 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '10px',
                                    right: '20px',
                                    height: '100%',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    borderLeft: '3px solid var(--color-success)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: 'var(--space-2)',
                                    fontSize: 'var(--text-xs)',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ fontWeight: 600 }}>Deep Work: Strategy</div>
                                    <div style={{ color: 'var(--color-text-secondary)' }}>Focus Block</div>
                                </div>
                            )}

                            {hour === 11 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '10px',
                                    right: '20px',
                                    height: '60px', // 45 mins
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    borderLeft: '3px solid var(--color-info)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: 'var(--space-2)',
                                    fontSize: 'var(--text-xs)',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ fontWeight: 600 }}>Team Sync</div>
                                    <div style={{ color: 'var(--color-text-secondary)' }}>Zoom</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Current Time Indicator */}
                <div style={{
                    position: 'absolute',
                    top: '260px', // Mock position
                    left: '50px',
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-danger)',
                    zIndex: 10,
                    pointerEvents: 'none',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)'
                }}>
                    <div style={{
                        position: 'absolute',
                        left: '-4px',
                        top: '-3px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-danger)'
                    }} />
                </div>
            </div>
        </div>
    );
};

export default TimeGrid;
