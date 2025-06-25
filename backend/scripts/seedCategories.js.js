import db from '../models/index.js';

const seedCategories = async () => {
    try {
        await db.sequelize.sync();
        const existing = await db.Category.count();
        if (existing > 0) {
            console.log('Categories already exist. Skipping seed.');
            return;
        }

        const defaultCategories = [
            { name: 'Technology', description: 'Posts about technology and programming' },
            { name: 'Travel', description: 'Travel experiences and tips' },
            { name: 'Food', description: 'Recipes and restaurant reviews' },
            { name: 'Lifestyle', description: 'Daily life and personal thoughts' }
        ];

        await db.Category.bulkCreate(defaultCategories);
        console.log('Default categories seeded successfully.');
    } 
    catch (err) {
        console.error('Failed to seed categories:', err.message);
    }
};

seedCategories();