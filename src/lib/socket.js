import { io } from "socket.io-client";

const baseUrl = import.meta.env.PUBLIC_SOCKET_URL;
export const socket = io(baseUrl, {
    autoConnect: false,
});