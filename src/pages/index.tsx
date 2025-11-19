import React from 'react';
import TodayDeck from '../components/features/today/TodayDeck';
import CustomerOrbit from '../components/features/customers/CustomerOrbit';
import KanbanBoard from '../components/features/work/KanbanBoard';

export const TodayPage: React.FC = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 className="text-h2" style={{ marginBottom: 'var(--space-6)' }}>Today Control Deck</h2>
        <div style={{ flex: 1, minHeight: 0 }}>
            <TodayDeck />
        </div>
    </div>
);

export const CustomersPage: React.FC = () => (
    <div style={{ height: '100%' }}>
        <CustomerOrbit />
    </div>
);

export const WorkPage: React.FC = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 className="text-h2" style={{ marginBottom: 'var(--space-6)' }}>Workstream Board</h2>
        <div style={{ flex: 1, minHeight: 0 }}>
            <KanbanBoard />
        </div>
    </div>
);

export const SystemsPage: React.FC = () => (
    <div>
        <h2 className="text-h2" style={{ marginBottom: 'var(--space-6)' }}>Systems & Config</h2>
        <div
            className="glass-card"
            style={{
                padding: 'var(--space-8)',
                maxWidth: '800px'
            }}
        >
            <p className="text-body">Settings and presets will appear here.</p>
        </div>
    </div>
);
