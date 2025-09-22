import { Router } from 'express';

const router = Router();

router.get('/features', (_req, res) => {
  res.json([
    { title: 'Automation', description: 'Smart tools to save time every day.' },
    { title: 'Analytics', description: 'Understand performance with clarity.' },
    { title: 'Integrations', description: 'Connect the tools you love.' }
  ]);
});

export default router;

