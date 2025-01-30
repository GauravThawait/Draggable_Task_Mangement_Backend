import app from "./src/app.js";
import dotenv from 'dotenv'
import connectDB from "./src/Db/connectDB.js";
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 5000

dotenv.config()
connectDB()

app.get("/api/v1/get", (req, res)=> {
    res.send("test done")
})

app.get("/", (req, res) => {
    res.send("Server is Running")
})


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/api/v1/image', (req, res) => {
    const logoPath = path.join(__dirname, 'src', 'utils', 'logo.jpg');
    res.sendFile(logoPath);
  });

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})