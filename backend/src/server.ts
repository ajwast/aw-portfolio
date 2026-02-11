import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());


app.get('/api/status', (req,res)=>{
    res.json({status: "Server Running"})
})

app.listen(PORT, ()=>{
    console.log(`Serving on ${PORT}`);
})