import React, { type ReactNode } from 'react';
import LeftRail from './LeftRail';
import InsightRibbon from './InsightRibbon';
import CommandPalette from '../features/CommandPalette';
import Background from './Background';
import PageTransition from './PageTransition';

import { useLayoutStore } from '../../store/layoutStore';
import { useNavigationStore } from '../../store/navigationStore';

interface AppShellProps {
    children: ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
    const { currentPage } = useNavigationStore();
    const { showInsightRibbon, showRightRail } = useLayoutStore();

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
            <Background />
            <CommandPalette />
            <LeftRail />

            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backgroundColor: 'transparent',
                zIndex: 1,
                minWidth: 0
            }}>
                {showInsightRibbon && <InsightRibbon />}

                <div style={{
                    flex: 1,
                    overflow: 'hidden',
                    padding: 'var(--space-8)',
                    position: 'relative'
                }}>
                    <PageTransition key={currentPage}>
                        {children}
                    </PageTransition>
                </div>
            </main>

            {/* Right Rail with enhanced glassmorphism */}
            {showRightRail && (
                <aside
                    className="glass-card-elevated"
                    style={{
                        width: '320px',
                        height: '100%',
                        borderLeft: '1px solid var(--color-border-glass)',
                        borderRadius: 0,
                        zIndex: 20
                    }}
                >
                    <div style={{ padding: 'var(--space-6)' }}>
                        <h3 className="text-h3">Context Panel</h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
                            Select an item to view details.
                        </p>
                    </div>
                </aside>
            )}
        </div>
    );
};

export default AppShell;
