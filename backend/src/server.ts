import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors());



app.get('/api/status', (req,res)=>{
    res.json({status: "Server Running"})
})

app.listen(PORT, ()=>{
    console.log(`Serving on ${PORT}`);
})