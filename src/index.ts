import "dotenv/config";
import Server from "./config/server";

const server = new Server();

server.listen();
