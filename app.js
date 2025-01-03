import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors())

app.get("/weather", async (req, res) => {
    const { city } = req.query
    const apiKey = process.env.KEY

    if (!city) {
        return res.status(400).json({ error: "Por favor, forneça uma cidade." });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
})

app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}`)
})