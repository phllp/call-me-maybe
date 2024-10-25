import dotenv from 'dotenv';
dotenv.config();

import { httpsServer } from './server';

const port = process.env.PORT;
httpsServer.listen(port, () => {
  console.log(`HTTPS server listening on port ${port}`);
});
