import express from 'express';
import next from 'next';

const port = parseInt(process.env.PORT || '3001', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Simple test route
  server.get('/test/:param', (req, res) => {
    const { param } = req.params;
    res.send(`Parameter value is: ${param}`);
  });

  // Catch-all route for Next.js pages and assets
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
