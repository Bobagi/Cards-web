const { defineConfig } = require("@vue/cli-service");

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
    host: "0.0.0.0", // Exponha para ser acessível no Codespaces
    port: 8080, // Porta padrão
    //https: true, // Força HTTPS
    //allowedHosts: "all", // Permite qualquer host se conectar
    client: {
      webSocketURL: {
        hostname: "0.0.0.0",
        port: 443, // Porta HTTPS padrão
        protocol: "wss", // Use WebSocket seguro
      },
    },
  },
});
