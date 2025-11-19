import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Task } from '../../../store/kanbanStore';

interface KanbanCardProps {
    task: Task;
}

import { useHoverAnimation } from '../../../hooks/useHoverAnimation';

const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id });

    const hoverRef = useHoverAnimation(1.02, 0.2, -2);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="glass-panel"
        >
            <div
                ref={hoverRef as React.RefObject<HTMLDivElement>}
                style={{
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-tertiary)'
                    }}>{task.customer}</span>
                    {task.priority === 'High' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-danger)' }} />}
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.4 }}>{task.title}</h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        <Calendar size={12} style={{ marginRight: '4px' }} />
                        {task.dueDate}
                    </div>
                    {task.priority === 'High' && (
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-danger)' }}>
                            <AlertCircle size={12} style={{ marginRight: '4px' }} />
                            High
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KanbanCard;
