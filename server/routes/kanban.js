import express from 'express';
const router = express.Router();

// GET all kanban data
router.get('/', async (req, res) => {
    try {
        const { db } = req;
        await db.read();
        res.json(db.data.kanban);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch kanban data' });
    }
});

// POST new task
router.post('/tasks', async (req, res) => {
    try {
        const { db } = req;
        const { task, columnId } = req.body;

        await db.read();

        // Add task to tasks object
        db.data.kanban.tasks[task.id] = task;

        // Add task ID to column
        if (db.data.kanban.columns[columnId]) {
            db.data.kanban.columns[columnId].taskIds.push(task.id);
        }

        await db.write();
        res.json({ success: true, task });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// PUT update task
router.put('/tasks/:id', async (req, res) => {
    try {
        const { db } = req;
        const { id } = req.params;
        const updates = req.body;

        await db.read();

        if (db.data.kanban.tasks[id]) {
            db.data.kanban.tasks[id] = { ...db.data.kanban.tasks[id], ...updates };
            await db.write();
            res.json({ success: true, task: db.data.kanban.tasks[id] });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const { db } = req;
        const { id } = req.params;

        await db.read();

        // Remove task
        delete db.data.kanban.tasks[id];

        // Remove from all columns
        Object.keys(db.data.kanban.columns).forEach(colId => {
            db.data.kanban.columns[colId].taskIds =
                db.data.kanban.columns[colId].taskIds.filter(taskId => taskId !== id);
        });

        await db.write();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// PUT move task
router.put('/move', async (req, res) => {
    try {
        const { db } = req;
        const { taskId, sourceColId, destColId, newIndex } = req.body;

        await db.read();

        const sourceCol = db.data.kanban.columns[sourceColId];
        const destCol = db.data.kanban.columns[destColId];

        if (!sourceCol || !destCol) {
            return res.status(404).json({ error: 'Column not found' });
        }

        // Remove from source
        sourceCol.taskIds = sourceCol.taskIds.filter(id => id !== taskId);

        // Add to destination at specific index
        destCol.taskIds.splice(newIndex, 0, taskId);

        await db.write();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to move task' });
    }
});

// POST new column
router.post('/columns', async (req, res) => {
    try {
        const { db } = req;
        const { column } = req.body;

        await db.read();

        db.data.kanban.columns[column.id] = column;
        db.data.kanban.columnOrder.push(column.id);

        await db.write();
        res.json({ success: true, column });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create column' });
    }
});

export default router;
