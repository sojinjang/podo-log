export default function (user: string) {
  switch (user) {
    case "dev" || "production":
      return {
        user: process.env.EC2_MYSQL_USER,
        password: process.env.EC2_MYSQL_PASSWORD,
        database: "podolog",
        host: process.env.EC2_MYSQL_HOST,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        timezone: "+00:00",
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
