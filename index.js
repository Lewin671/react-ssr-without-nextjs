import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { renderToString } from "react-dom/server";
import App from "./components/App.jsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the 'dist/public' directory
app.use('/static', express.static(path.join(__dirname, 'dist', 'public')));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  const appString = renderToString(<App />);
  res.send(`<html>
  <body>
    <div id="root">${appString}</div>
    <script src="/static/bundle.js"></script>
  </body>
  </html>`);
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
