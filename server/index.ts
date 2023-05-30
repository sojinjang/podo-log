import http from "http";
import dotenv from "dotenv";
dotenv.config();
import startLoaders from "./src/app";
import { logger } from "./src/utils";
import { port } from "./src/config";

startLoaders().then((app) => {
  const server = http.createServer(app);
  server
    .listen(port, () => {
      logger.info(`정상적으로 서버를 시작하였습니다.  http://localhost:${port}`);
    })
    .on("서버접속 에러", (e) => logger.error(e));
});
