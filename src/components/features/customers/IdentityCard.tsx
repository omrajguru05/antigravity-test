import React from 'react';
import { Mail, Tag, IndianRupee } from 'lucide-react';
import type { Customer } from '../../../store/customerStore';

interface IdentityCardProps {
    customer: Customer;
}

import { useHoverAnimation } from '../../../hooks/useHoverAnimation';

const IdentityCard: React.FC<IdentityCardProps> = ({ customer }) => {
    const messageBtnRef = useHoverAnimation(1.05, 0.2, -2);
    const editBtnRef = useHoverAnimation(1.05, 0.2, -2);

    return (
        <div className="glass-panel" style={{
            width: '300px',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 'var(--space-6)'
        }}>
            <img
                src={customer.avatar}
                alt={customer.name}
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    marginBottom: 'var(--space-4)',
                    border: '3px solid var(--color-bg-surface)'
                }}
            />
            <h3 className="text-h3" style={{ textAlign: 'center', marginBottom: 'var(--space-1)' }}>{customer.name}</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>{customer.contact}</p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
                    <Mail size={16} style={{ marginRight: 'var(--space-3)', color: 'var(--color-text-tertiary)' }} />
                    {customer.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
                    <Tag size={16} style={{ marginRight: 'var(--space-3)', color: 'var(--color-text-tertiary)' }} />
                    <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-primary-subtle)',
                        color: 'var(--color-primary)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600
                    }}>
                        {customer.segment}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
                    <IndianRupee size={16} style={{ marginRight: 'var(--space-3)', color: 'var(--color-text-tertiary)' }} />
                    {customer.ltv} LTV
                </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)', width: '100%', display: 'flex', gap: 'var(--space-2)' }}>
                <button ref={messageBtnRef as React.RefObject<HTMLButtonElement>} className="btn btn-primary" style={{ flex: 1 }}>Message</button>
                <button ref={editBtnRef as React.RefObject<HTMLButtonElement>} className="btn btn-ghost" style={{ border: '1px solid var(--color-border)' }}>Edit</button>
            </div>
        </div>
    );
};

export default IdentityCard;
