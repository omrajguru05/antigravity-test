import React from 'react';
import { Circle, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { useKanbanStore } from '../../../store/kanbanStore';
import { useHoverAnimation } from '../../../hooks/useHoverAnimation';

const ActiveItemRow: React.FC<{ task: any, toggleTask: (id: string) => void }> = ({ task, toggleTask }) => {
    const hoverRef = useHoverAnimation(1.02, 0.2, -2);

    return (
        <div
            ref={hoverRef as React.RefObject<HTMLDivElement>}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                background: 'var(--color-surface-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
            }}>
            <button
                onClick={() => toggleTask(task.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-tertiary)',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex'
                }}
            >
                <Circle size={20} />
            </button>

            <div style={{ flex: 1 }}>
                <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    marginBottom: '2px'
                }}>
                    {task.title}
                </div>
                <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {task.dueDate}
                    </span>
                    <span>•</span>
                    <span>{task.customer}</span>
                </div>
            </div>

            {task.priority === 'High' && (
                <AlertCircle size={16} color="var(--color-error)" />
            )}
        </div>
    );
};

const ActiveItems: React.FC = () => {
    const { tasks, toggleTask } = useKanbanStore();

    // Filter for active tasks (not completed) and limit to 5 for the deck view
    const activeTasks = Object.values(tasks)
        .filter(task => !task.completed)
        .slice(0, 5);

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)'
                }}>
                    Active Items
                </h3>
                <button style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)'
                }}>
                    View All <ArrowRight size={14} />
                </button>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)'
            }}>
                {activeTasks.map((task) => (
                    <ActiveItemRow key={task.id} task={task} toggleTask={toggleTask} />
                ))}

                {activeTasks.length === 0 && (
                    <div style={{
                        padding: 'var(--space-4)',
                        textAlign: 'center',
                        color: 'var(--color-text-tertiary)',
                        fontSize: 'var(--text-sm)'
                    }}>
                        No active tasks. All caught up!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveItems;
