import "dotenv/config";
import { dbConection } from "./config/db";
import Server from "./config/server";

dbConection();
const server = new Server();

server.listen();
