import http from "http";
import dotenv from "dotenv";
import app from "./src/app";
import { logger } from "./src/utils";
const PORT = process.env.PORT || 5000;
dotenv.config();

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
