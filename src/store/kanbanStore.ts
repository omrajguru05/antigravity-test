import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { apiClient } from '../utils/api';

export interface Task {
    id: string;
    title: string;
    customer: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    completed?: boolean;
}

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

interface KanbanState {
    tasks: Record<string, Task>;
    columns: Record<string, Column>;
    columnOrder: string[];
    isLoading: boolean;
    loadKanbanData: () => Promise<void>;
    moveTask: (taskId: string, sourceColId: string, destColId: string, newIndex: number) => Promise<void>;
    addTask: (columnId: string, title: string) => Promise<void>;
    toggleTask: (taskId: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    addColumn: (title: string) => Promise<void>;
}

export const useKanbanStore = create<KanbanState>()((set, get) => ({
    tasks: {},
    columns: {},
    columnOrder: [],
    isLoading: false,

    loadKanbanData: async () => {
        try {
            set({ isLoading: true });
            const data = await apiClient.get<{
                tasks: Record<string, Task>;
                columns: Record<string, Column>;
                columnOrder: string[];
            }>('/kanban');
            set({ tasks: data.tasks, columns: data.columns, columnOrder: data.columnOrder, isLoading: false });
        } catch (error) {
            console.error('Failed to load kanban data:', error);
            set({ isLoading: false });
        }
    },

    moveTask: async (taskId, sourceColId, destColId, newIndex) => {
        const state = get();
        const sourceCol = state.columns[sourceColId];
        const destCol = state.columns[destColId];

        const newTaskIdsSource = Array.from(sourceCol.taskIds);
        newTaskIdsSource.splice(newTaskIdsSource.indexOf(taskId), 1);

        const newTaskIdsDest = Array.from(destCol.taskIds);

        if (sourceColId === destColId) {
            newTaskIdsDest.splice(newTaskIdsSource.indexOf(taskId), 1);
            newTaskIdsSource.splice(newIndex, 0, taskId);

            set({
                columns: {
                    ...state.columns,
                    [sourceColId]: {
                        ...sourceCol,
                        taskIds: newTaskIdsSource,
                    },
                },
            });
        } else {
            newTaskIdsDest.splice(newIndex, 0, taskId);

            set({
                columns: {
                    ...state.columns,
                    [sourceColId]: {
                        ...sourceCol,
                        taskIds: newTaskIdsSource,
                    },
                    [destColId]: {
                        ...destCol,
                        taskIds: newTaskIdsDest,
                    },
                },
            });
        }

        // Persist to backend
        try {
            await apiClient.put('/kanban/move', { taskId, sourceColId, destColId, newIndex });
        } catch (error) {
            console.error('Failed to move task:', error);
            // Revert on error
            await get().loadKanbanData();
        }
    },

    addTask: async (columnId, title) => {
        const newTaskId = uuidv4();
        const newTask: Task = {
            id: newTaskId,
            title,
            customer: 'Unassigned',
            dueDate: 'No Date',
            priority: 'Medium',
            completed: false,
        };

        const state = get();
        const column = state.columns[columnId];
        const newTaskIds = [...column.taskIds, newTaskId];

        set({
            tasks: { ...state.tasks, [newTaskId]: newTask },
            columns: {
                ...state.columns,
                [columnId]: { ...column, taskIds: newTaskIds },
            },
        });

        // Persist to backend
        try {
            await apiClient.post('/kanban/tasks', { task: newTask, columnId });
        } catch (error) {
            console.error('Failed to add task:', error);
            await get().loadKanbanData();
        }
    },

    toggleTask: async (taskId) => {
        const state = get();
        const task = state.tasks[taskId];
        const updatedTask = { ...task, completed: !task.completed };

        set({
            tasks: {
                ...state.tasks,
                [taskId]: updatedTask,
            },
        });

        // Persist to backend
        try {
            await apiClient.put(`/kanban/tasks/${taskId}`, updatedTask);
        } catch (error) {
            console.error('Failed to toggle task:', error);
            await get().loadKanbanData();
        }
    },

    deleteTask: async (taskId) => {
        const state = get();
        const newTasks = { ...state.tasks };
        delete newTasks[taskId];

        const newColumns = { ...state.columns };
        Object.keys(newColumns).forEach((colId) => {
            newColumns[colId].taskIds = newColumns[colId].taskIds.filter((id) => id !== taskId);
        });

        set({
            tasks: newTasks,
            columns: newColumns,
        });

        // Persist to backend
        try {
            await apiClient.delete(`/kanban/tasks/${taskId}`);
        } catch (error) {
            console.error('Failed to delete task:', error);
            await get().loadKanbanData();
        }
    },

    addColumn: async (title) => {
        const newColId = uuidv4();
        const newColumn: Column = {
            id: newColId,
            title,
            taskIds: [],
        };

        const state = get();
        set({
            columns: { ...state.columns, [newColId]: newColumn },
            columnOrder: [...state.columnOrder, newColId],
        });

        // Persist to backend
        try {
            await apiClient.post('/kanban/columns', { column: newColumn });
        } catch (error) {
            console.error('Failed to add column:', error);
            await get().loadKanbanData();
        }
    },
}));
