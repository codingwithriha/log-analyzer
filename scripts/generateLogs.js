const fs = require("fs");

const logs = [];

const methods = ["GET", "POST", "PUT"];

const paths = [
  "/api/users",
  "/api/login",
  "/products",
  "/orders"
];

const statusCodes = [200, 201, 400, 401, 404, 500];



for (let i = 0; i < 100; i++) {

  const timestamp =
    new Date().toISOString();

  const ip =
    `192.168.1.${Math.floor(Math.random() * 255)}`;

  const method =
    methods[Math.floor(Math.random() * methods.length)];

  const path =
    paths[Math.floor(Math.random() * paths.length)];

  const status =
    statusCodes[Math.floor(Math.random() * statusCodes.length)];

  const responseTime =
    `${Math.floor(Math.random() * 500)}ms`;

  const log =
    `${timestamp} ${ip} ${method} ${path} ${status} ${responseTime}`;

  logs.push(log);
}



logs.push("BROKEN LOG LINE");

logs.push("ERROR SOMETHING FAILED");

logs.push("");



logs.push(
  JSON.stringify({
    timestamp: new Date().toISOString(),
    ip: "10.0.0.1",
    method: "GET",
    path: "/json-api",
    status: 200,
    responseTime: "120ms"
  })
);



logs.push(
  `${new Date().toISOString()} 192.168.1.50 GET /products - 0.5s`
);



fs.writeFileSync(
  "sample-logs/generated.log",
  logs.join("\n")
);

console.log("Generated log file successfully.");