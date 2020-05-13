import { Router } from 'express';

const articlesRouter = Router();

interface AssumedTasks {
  id: string;
  status: 'writing' | 'pending' | 'recused' | 'accepted' | 'returned';
  writer: string;
  assumed: Date;
  delivered?: Date;
  words: number;
  value: number;
  article: string;
  commnets: string[];
}

const assumedTasks: AssumedTasks[] = [];

articlesRouter.get('/');

articlesRouter.post('/');

articlesRouter.put('/');

export default articlesRouter;
