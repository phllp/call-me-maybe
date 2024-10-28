import jwt from 'jsonwebtoken';

const generateInviteLink = () => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  const myData = {
    email: 'johndoe@jd.com',
  };

  const token = jwt.sign(myData, jwtSecret);

  const inviteLink = `http://localhost:3000/invite?token=${token}`;
  return inviteLink;
};

const validateToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw error;
  }
};

export { generateInviteLink, validateToken };
