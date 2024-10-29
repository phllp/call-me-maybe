import express from 'express';
import { generateInviteLink, validateToken } from './functions';

const routes = express.Router();
routes.use(express.json());

routes.get('/health', (req, res) => {
  res.status(200).send('OK');
});

routes.get('/invite-link', (req, res) => {
  try {
    console.log('Generating invite link');
    const inviteLink = generateInviteLink();
    res.status(200).send(inviteLink);
  } catch (error) {}
  res.status(200).send('https://discord.gg/invite');
});

routes.post('/validate-token', (req, res) => {
  console.log('Validating token');
  const token = req.body.token as string;
  const decoded = validateToken(token);
  res.json(decoded);
});

export default routes;
