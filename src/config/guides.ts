import { type Guide } from '../store/guideStore';

export const todayGuide: Guide = {
    id: 'today',
    steps: [
        {
            target: '.today-deck',
            title: 'Your Daily Dashboard',
            content: 'This is your Today page where you can see your schedule and active tasks at a glance.',
            position: 'bottom'
        },
        {
            target: '.time-grid',
            title: 'Time Management',
            content: 'View and manage your time blocks here. Click on any slot to add or edit events.',
            position: 'right'
        },
        {
            target: '.active-items',
            title: 'Active Tasks',
            content: 'Track your current tasks and their progress. Drag to reorder or click to view details.',
            position: 'left'
        }
    ]
};

export const customersGuide: Guide = {
    id: 'customers',
    steps: [
        {
            target: '.customer-orbit',
            title: 'Customer Overview',
            content: 'View all your customer relationships and interactions in one place.',
            position: 'bottom'
        },
        {
            target: '.identity-card',
            title: 'Customer Profile',
            content: 'See detailed information about each customer including contact details and status.',
            position: 'right'
        },
        {
            target: '.journey-timeline',
            title: 'Interaction History',
            content: 'Track all meetings, emails, and calls with this customer over time.',
            position: 'left'
        }
    ]
};

export const workGuide: Guide = {
    id: 'work',
    steps: [
        {
            target: '.kanban-board',
            title: 'Work Board',
            content: 'Manage your projects using this kanban board. Drag cards between columns to update status.',
            position: 'top'
        },
        {
            target: '.kanban-column',
            title: 'Work Columns',
            content: 'Organize tasks into columns like To Do, In Progress, and Done.',
            position: 'bottom'
        },
        {
            target: '.kanban-card',
            title: 'Task Cards',
            content: 'Each card represents a task. Click to edit details or drag to move between columns.',
            position: 'right'
        }
    ]
};

export const systemsGuide: Guide = {
    id: 'systems',
    steps: [
        {
            target: '.systems-page',
            title: 'Systems & Settings',
            content: 'Configure your workspace preferences and system settings here.',
            position: 'bottom'
        }
    ]
};
