import { Router } from "express";
import express from 'express'
import client from "../dbconfig.js";
import 'dotenv/config';
const apiKey = process.env.API_KEY;
import axios from 'axios';
const router = express.Router()

 
router.post('/', async (req, res) => {
  const { date, description, latitude, longitude } = req.body;
  try {
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    const { weather, main } = weatherResponse.data;
    const temperature = main.temp;

    const newEntry = await client.query('INSERT INTO entries (date, description, weather, temperature) VALUES ($1, $2, $3, $4) RETURNING *', [date, description, weather[0].main, temperature]);

    res.json(newEntry.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await client.query('SELECT * FROM entries');
    res.json(entries.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, description, weather, temperature } = req.body;
  try {
    const updatedEntry = await client.query('UPDATE entries SET date = $1, description = $2, weather = $3, temperature = $4 WHERE id = $5 RETURNING *', [date, description, weather, temperature, id]);
    res.json(updatedEntry.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM entries WHERE id = $1', [id]);
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router