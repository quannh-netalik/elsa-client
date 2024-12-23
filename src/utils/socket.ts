import { io, Socket } from "socket.io-client";

class SocketIO {
  private static instance: SocketIO | null = null;
  private socket: Socket;

  private constructor() {
    // Initialize the socket instance
    this.socket = io(import.meta.env.VITE_QUIZ_SESSION_SOCKET as string);
  }

  // Method to get the socket instance
  public static getInstance(): Socket {
    if (!SocketIO.instance) {
      SocketIO.instance = new SocketIO();
    }
    return SocketIO.instance.socket;
  }
}

// Access the socket instance
export const socket = SocketIO.getInstance();
