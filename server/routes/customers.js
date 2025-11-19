import express from 'express';
const router = express.Router();

// GET all customers
router.get('/', async (req, res) => {
    try {
        const { db } = req;
        await db.read();
        res.json(db.data.customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

// GET single customer
router.get('/:id', async (req, res) => {
    try {
        const { db } = req;
        const { id } = req.params;

        await db.read();
        const customer = db.data.customers.find(c => c.id === id);

        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

// POST new customer
router.post('/', async (req, res) => {
    try {
        const { db } = req;
        const customer = req.body;

        await db.read();
        db.data.customers.push(customer);
        await db.write();

        res.json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

// PUT update customer
router.put('/:id', async (req, res) => {
    try {
        const { db } = req;
        const { id } = req.params;
        const updates = req.body;

        await db.read();
        const index = db.data.customers.findIndex(c => c.id === id);

        if (index !== -1) {
            db.data.customers[index] = { ...db.data.customers[index], ...updates };
            await db.write();
            res.json({ success: true, customer: db.data.customers[index] });
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

// DELETE customer
router.delete('/:id', async (req, res) => {
    try {
        const { db } = req;
        const { id } = req.params;

        await db.read();
        db.data.customers = db.data.customers.filter(c => c.id !== id);
        await db.write();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

export default router;
