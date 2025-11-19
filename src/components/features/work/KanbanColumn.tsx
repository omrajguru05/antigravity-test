import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useKanbanStore } from '../../../store/kanbanStore';

interface KanbanColumnProps {
    id: string;
    title: string;
    count: number;
    children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, count, children }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className="glass-panel" style={{
            minWidth: '300px',
            width: '300px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-bg-surface-glass)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)',
                padding: '0 var(--space-2)'
            }}>
                <h3 className="text-h3" style={{ fontSize: '1rem' }}>{title}</h3>
                <span style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)'
                }}>{count}</span>
            </div>

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                overflowY: 'auto',
                paddingRight: 'var(--space-2)'
            }}>
                <SortableContext id={id} items={React.Children.map(children, (child: any) => child.props.task.id) || []} strategy={verticalListSortingStrategy}>
                    {children}
                </SortableContext>
            </div>

            <button
                onClick={() => useKanbanStore.getState().addTask(id, 'New Task')}
                style={{
                    marginTop: 'var(--space-3)',
                    width: '100%',
                    padding: 'var(--space-2)',
                    background: 'none',
                    border: '1px dashed var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-tertiary)',
                    fontSize: 'var(--text-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-text-tertiary)';
                }}
            >
                + Add Task
            </button>
        </div>
    );
};

export default KanbanColumn;
