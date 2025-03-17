import express from "express";
import "dotenv/config";
const PORT = process.env.port || 4000;
const app = express()
app.get('/', (req, res) => {res.send('Hello World!')})
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})