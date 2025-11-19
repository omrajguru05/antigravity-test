import React from 'react';
import { format } from 'date-fns';

const Timeline: React.FC = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM
    const currentTime = new Date();

    return (
        <div className="glass-panel" style={{
            flex: 1,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)'
            }}>
                <h3 className="text-h3">Timeline</h3>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {format(currentTime, 'EEEE, MMMM do')}
                </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                {hours.map((hour) => (
                    <div key={hour} style={{
                        display: 'flex',
                        height: '60px',
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
                        <div style={{ flex: 1, position: 'relative' }}>
                            {/* Mock Event */}
                            {hour === 10 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    right: '10px',
                                    bottom: '10px',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    borderLeft: '3px solid var(--color-info)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: 'var(--space-2)',
                                    fontSize: 'var(--text-xs)'
                                }}>
                                    <div style={{ fontWeight: 600 }}>Client Meeting: Acme Corp</div>
                                    <div style={{ color: 'var(--color-text-secondary)' }}>Zoom • 1h</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Current Time Indicator */}
                <div style={{
                    position: 'absolute',
                    top: '145px', // Mock position
                    left: '50px',
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-danger)',
                    zIndex: 10,
                    pointerEvents: 'none'
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

export default Timeline;
