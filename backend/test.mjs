import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('TEST REUSSI !'));
app.listen(3000, '0.0.0.0', () => {
  console.log('Test Express fonctionnel sur http://localhost:3000');
});
