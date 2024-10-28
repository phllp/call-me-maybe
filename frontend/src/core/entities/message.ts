export type MessageData = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
  };
};
