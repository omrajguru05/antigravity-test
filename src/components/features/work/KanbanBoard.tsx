import React, { useState, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragOverEvent,
    type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { useKanbanStore } from '../../../store/kanbanStore';

const KanbanBoard: React.FC = () => {
    const { columns, columnOrder, tasks, moveTask, addColumn, loadKanbanData } = useKanbanStore();
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        loadKanbanData();
    }, [loadKanbanData]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Find the containers
        const activeColumnId = Object.keys(columns).find((key) =>
            columns[key].taskIds.includes(activeId)
        );
        const overColumnId = Object.keys(columns).find((key) =>
            columns[key].taskIds.includes(overId)
        ) || (columns[overId] ? overId : null);

        if (!activeColumnId || !overColumnId || activeColumnId === overColumnId) {
            return;
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeColumnId = Object.keys(columns).find((key) =>
            columns[key].taskIds.includes(activeId)
        );

        // If over a column directly (empty column case)
        let overColumnId = columns[overId] ? overId : null;

        // If over a task, find its column
        if (!overColumnId) {
            overColumnId = Object.keys(columns).find((key) =>
                columns[key].taskIds.includes(overId)
            ) || null;
        }

        if (!activeColumnId || !overColumnId) return;

        const overColumn = columns[overColumnId];

        // const activeIndex = activeColumn.taskIds.indexOf(activeId);
        let overIndex: number;

        if (overId === overColumnId) {
            // Dropped on the column container itself
            overIndex = overColumn.taskIds.length;
        } else {
            // Dropped on a task
            overIndex = overColumn.taskIds.indexOf(overId);
        }

        moveTask(activeId, activeColumnId, overColumnId, overIndex);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div style={{
                display: 'flex',
                gap: 'var(--space-6)',
                height: '100%',
                overflowX: 'auto',
                paddingBottom: 'var(--space-4)'
            }}>
                {columnOrder.map((columnId: string) => {
                    const column = columns[columnId];
                    const columnTasks = column.taskIds.map((taskId: string) => tasks[taskId]);

                    return (
                        <KanbanColumn key={column.id} id={column.id} title={column.title} count={columnTasks.length}>
                            {columnTasks.map((task: any) => (
                                <KanbanCard key={task.id} task={task} />
                            ))}
                        </KanbanColumn>
                    );
                })}

                {/* Add Column Placeholder */}
                <div
                    onClick={() => addColumn('New Section')}
                    style={{
                        minWidth: '300px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--color-text-tertiary)',
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
                    + Add Section
                </div>
            </div>

            <DragOverlay>
                {activeId ? (
                    <KanbanCard task={tasks[activeId]} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default KanbanBoard;
