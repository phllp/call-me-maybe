export type Session = {
  id: string;
  createdAt: string;
  hostId?: string;
  hostName?: string;
  guestId?: string;
  guestName?: string;
  socketId?: string;
};
