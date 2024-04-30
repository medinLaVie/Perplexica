import { initServer } from './websocketServer';
import http from 'http';

export const startWebSocketServer = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
) => {
  console.log('Starting WebSocket server');
  initServer(server);
};
