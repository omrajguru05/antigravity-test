import React from 'react';
import { format } from 'date-fns';
import { Calendar, Mail, PhoneCall } from 'lucide-react';
import type { TimelineEvent } from '../../../store/customerStore';

interface JourneyTimelineProps {
    events: TimelineEvent[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ events }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'meeting': return <Calendar size={16} />;
            case 'email': return <Mail size={16} />;
            case 'call': return <PhoneCall size={16} />;
            default: return <Calendar size={16} />;
        }
    };

    return (
        <div className="glass-panel" style={{
            flex: 1,
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 className="text-h3" style={{ marginBottom: 'var(--space-4)' }}>Journey Timeline</h3>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} style={{
                            display: 'flex',
                            marginBottom: 'var(--space-4)',
                            position: 'relative'
                        }}>
                            <div style={{
                                marginRight: 'var(--space-4)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--color-bg-subtle)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-secondary)',
                                    zIndex: 2
                                }}>
                                    {getIcon(event.type)}
                                </div>
                                <div style={{
                                    width: '2px',
                                    flex: 1,
                                    backgroundColor: 'var(--color-border)',
                                    marginTop: 'var(--space-2)'
                                }} />
                            </div>

                            <div style={{ flex: 1, paddingBottom: 'var(--space-4)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                                    <span style={{ fontWeight: 600 }}>{event.title}</span>
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                                        {format(new Date(event.date), 'MMM d, h:mm a')}
                                    </span>
                                </div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                                    {event.notes}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-8)' }}>
                        No recent activity
                    </div>
                )}
            </div>
        </div>
    );
};

export default JourneyTimeline;
