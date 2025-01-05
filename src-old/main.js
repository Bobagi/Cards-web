import express from "express"; // Substitua o require por import
import path from "path"; // Substitua o require por import
import GameClient from "../src/game.js"; // Já está correto
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT_WEB || 3000;

// Serve arquivos estáticos da pasta "src"
app.use(express.static(path.join(process.cwd(), "src")));

// Rota principal para o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "index.html"));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const gameClient = new GameClient();

// Exponha apenas se for realmente necessário, mas use `gameClient` diretamente em scripts do HTML
export { gameClient };
