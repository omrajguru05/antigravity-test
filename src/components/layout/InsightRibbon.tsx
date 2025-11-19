import React from 'react';
import { AlertCircle, CheckCircle, DollarSign, Users } from 'lucide-react';

const InsightRibbon: React.FC = () => {
    const metrics = [
        { icon: Users, label: 'Active Customers', value: '7', color: 'var(--color-info)' },
        { icon: AlertCircle, label: 'Overdue Tasks', value: '3', color: 'var(--color-danger)' },
        { icon: DollarSign, label: 'Revenue at Risk', value: '₹18,000', color: 'var(--color-warning)' },
        { icon: CheckCircle, label: 'Completed Today', value: '12', color: 'var(--color-success)' },
    ];

    return (
        <div className="glass-panel" style={{
            minHeight: '56px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--space-8)',
            gap: 'var(--space-8)',
            borderBottom: '1px solid var(--color-border-glass)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            flexWrap: 'wrap'
        }}>
            {metrics.map((metric, index) => (
                <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: '0.875rem',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background var(--transition-fast)',
                    cursor: 'default'
                }}>
                    <metric.icon size={16} color={metric.color} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>{metric.label}:</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{metric.value}</span>
                </div>
            ))}
        </div>
    );
};

export default InsightRibbon;
