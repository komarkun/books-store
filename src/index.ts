import app from "./app"

const serveConfig = {
  fetch: app.fetch,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT
}

console.log(`Server is running on http://${serveConfig.hostname}:${serveConfig.port}`);


Bun.serve(serveConfig)
