import express from 'express';
import cors from 'cors'
import routes from './routes/routes.js';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ status: "ok", code: 200, message: 'Server is running' });
});

export default app;