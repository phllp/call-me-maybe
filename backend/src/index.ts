import dotenv from 'dotenv';
dotenv.config();

import { httpsServer, app } from './server';
import socketServer from './socket-server';

socketServer(httpsServer, app);
const port = process.env.PORT;
httpsServer.listen(port, () => {
  console.log(`HTTPS server listening on port ${port}`);
});
