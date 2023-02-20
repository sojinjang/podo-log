export default function (user: string) {
  switch (user) {
    case "dev" || "production":
      return {
        user: process.env.RDS_MYSQL_USER,
        password: process.env.RDS_MYSQL_PASSWORD,
        database: "podolog",
        host: process.env.RDS_MYSQL_HOST,
        waitForConnections: true,
        connectionLimit: 60,
        queueLimit: 0,
      };
    default:
      return {
        user: "root",
        password: process.env.LOCAL_MYSQL_PASSWORD,
        database: "podolog",
        host: "127.0.0.1",
        port: 6000,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        timezone: "+00:00",
      };
  }
}
