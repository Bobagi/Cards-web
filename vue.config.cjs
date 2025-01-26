const { defineConfig } = require("@vue/cli-service");
require("dotenv").config();

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Card web",
    },
  },
  devServer: {
    host: "0.0.0.0", // Expose to be accessible in Codespaces
    port: process.env.PORT_WEB || 3000,
    // https: true, // Force HTTPS
    // allowedHosts: "all", // Allow any host to connect
    client: {
      webSocketURL: {
        hostname: "0.0.0.0",
        port: 443, // Standard HTTPS port
        protocol: "wss", // Use secure WebSocket
      },
    },
  },
});
