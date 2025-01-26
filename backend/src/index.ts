import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';

import { httpsServer, app } from './server';
import socketServer from './socket-server';

socketServer(httpsServer, app);
app.use(routes);
const port = process.env.PORT;
httpsServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
