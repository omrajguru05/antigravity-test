import React from 'react';
import TimeGrid from '../time/TimeGrid';
import ActiveItems from './ActiveItems';

const TodayDeck: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            overflow: 'hidden',
            gap: 'var(--space-6)',
            flexDirection: 'row'
        }}>
            <TimeGrid />
            <ActiveItems />
        </div>
    );
};

export default TodayDeck;
