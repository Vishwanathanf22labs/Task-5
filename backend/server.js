import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import db from './models/index.js';

const PORT = process.env.PORT;

db.sequelize.authenticate()
  .then(() => {
    console.log('DB connected');
    return db.sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
  });
