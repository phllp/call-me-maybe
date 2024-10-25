import express from 'express';
import { createServer as createServerHttp, Server } from 'http';
import { createServer as createServerHttps } from 'https';
import { readFileSync } from 'fs';
import path from 'path';
import cors from 'cors';

const isDevelopment = process.env.NODE_ENV === 'development';

const corsOptions = {
  origin: ['https://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

let httpsServer: Server;

if (!isDevelopment) {
  try {
    console.log('Production mode');
    // Leitura dos certificados SSL
    const key = readFileSync(
      path.join(__dirname, '..', 'certs', 'create-cert-key.pem')
    );
    const cert = readFileSync(
      path.join(__dirname, '..', 'certs', 'create-cert.pem')
    );
    // Criação do servidor HTTPS
    httpsServer = createServerHttps({ key, cert }, app);
  } catch (error) {
    console.error('Erro ao ler os certificados SSL', error);
    process.exit(1);
  }
} else {
  console.log('Development mode');
  httpsServer = createServerHttp(app);
}

export { httpsServer, app };
