import express from 'express';
import { encodeSessionData, validateToken } from './functions';
import { app } from './server';
import { v4 as uuidv4 } from 'uuid';

export type Session = {
  id: string;
  createdAt: string;
  hostId?: string;
  hostName?: string;
  guestId?: string;
  guestName?: string;
  socketId?: string;
};

const sessions: Session[] = [];
app.set('sessions', sessions);

const routes = express.Router();
routes.use(express.json());

routes.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Creates a new session and returns it's data
routes.post('/create-session', (req, res) => {
  const sessionInfo: Session = {
    id: uuidv4(),
    createdAt: new Date().getTime().toString(),
    hostName: req.body.hostName,
    hostId: uuidv4(),
  };
  sessions.push(sessionInfo);
  res.status(200).send(encodeSessionData(sessionInfo));
});

routes.get('/invite-link', (req, res) => {
  // try {
  //   console.log('Generating invite link');
  //   const inviteLink = generateInviteLink();
  //   res.status(200).send(inviteLink);
  // } catch (error) {
  //   res.status(500);
  // }
});

routes.get('/sessions', (req, res) => {
  console.log('Sessions', sessions);
  res.status(200).send(sessions);
});

routes.post('/validate-token', (req, res) => {
  console.log('Validating token');
  const token = req.body.token as string;
  const decoded = validateToken(token);
  res.json(decoded);
});

export default routes;
