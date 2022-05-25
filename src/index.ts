import "dotenv/config";
import { cloudinaryConfig } from "./config/cloudinary";
import { dbConection } from "./config/db";
import Server from "./config/server";

dbConection();
cloudinaryConfig();
const server = new Server();

server.listen();
