import express from 'express';
import {
  encodeSessionData,
  generateInviteLink,
  validateToken,
} from './functions';
import { v4 as uuidv4 } from 'uuid';

export type CallMetadata = {
  id: string;
  createdAt: string;
  hostId?: string;
  hostName?: string;
  guestId?: string;
  guestName?: string;
  socketId?: string;
};

const routes = express.Router();
routes.use(express.json());

routes.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Creates a new session and returns it's data
routes.post('/create-session', (req, res) => {
  const sessionInfo: CallMetadata = {
    id: uuidv4(),
    createdAt: new Date().getTime().toString(),
    hostName: req.body.hostName,
    hostId: uuidv4(),
  };
  res.status(200).send(encodeSessionData(sessionInfo));
});

routes.post('/invite-link', (req, res) => {
  try {
    console.log('Generating invite link');
    const { callMetadata } = req.body.data;
    const inviteLink = generateInviteLink(callMetadata);
    res.status(200).send(inviteLink);
  } catch (error) {
    res.status(500);
  }
});

routes.post('/validate-token', (req, res) => {
  console.log('Validating token');
  const token = req.body.token as string;
  const decoded = validateToken(token);
  res.json(decoded);
});

export default routes;
