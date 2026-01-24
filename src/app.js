import express from 'express';
import cors from 'cors'
import sequelize from './config/db.js';
import routes from './routes/routes.js';
import './models/models.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

await sequelize.sync();

app.get('/', (req, res) => {
  res.json({ status: "ok", code: 200, message: 'Server is running' });
});

export default app;