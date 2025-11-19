import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import kanbanRouter from './routes/kanban.js';
import customersRouter from './routes/customers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize database
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, {});

// Read data from JSON file
await db.read();

// Default data structure
db.data ||= { kanban: { tasks: {}, columns: {}, columnOrder: [] }, customers: [] };

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Make db available to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Routes
app.use('/api/kanban', kanbanRouter);
app.use('/api/customers', customersRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'HelixDesk API is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 HelixDesk API server running on http://localhost:${PORT}`);
});
