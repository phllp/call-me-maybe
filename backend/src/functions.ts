import jwt from 'jsonwebtoken';
import { CallMetadata } from './routes';

const encodeSessionData = (data: CallMetadata) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(data, jwtSecret);
};

const validateToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  try {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    console.error(error);
  }
};

const generateInviteLink = (data: CallMetadata) => {
  const token = encodeSessionData(data);
  const link = `/join-call?token=${token}`;
  return link;
};

export { encodeSessionData, validateToken, generateInviteLink };
