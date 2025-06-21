import { io } from "socket.io-client";

export const socket = io("https://imposterselfmadebackend.onrender.com/", {
    autoConnect: false,
});