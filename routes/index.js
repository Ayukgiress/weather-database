import { Router } from "express";
import express from 'express'
import client from "../dbconfig.js";
import 'dotenv/config';
const apiKey = process.env.API_KEY;
import axios from 'axios';
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Weather Forecast Journal API');
});

router.get('/weather', async (req, res) => {
    try {
      const weatherResponse = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: req.query.lat,
            lon: req.query.lon,
            appid: apiKey,
            units: 'metric',
        },
    });

        res.json(weatherResponse.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

let journalEntries = [];

router.get('/journal_entries', (req, res) => {
    res.json(journalEntries);
});

router.get('/journal_entries/:id', (req, res) => {
    const entryId = parseInt(req.params.id);
    const entry = journalEntries.find((entry) => entry.id === entryId);

    if (entry) {
        res.json(entry);
    } else {
        res.status(404).json({ error: 'Entry not found' });
    }
});

router.post('/journal_entries', (req, res) => {
    const newEntry = req.body;
    newEntry.id = journalEntries.length > 0 ? journalEntries[journalEntries.length - 1].id + 1 : 1;
    journalEntries.push(newEntry);

    res.status(201).json(newEntry);
});

router.put('/journal_entries/:id', (req, res) => {
    const entryId = parseInt(req.params.id);
    const entryIndex = journalEntries.findIndex((entry) => entry.id === entryId);

    if (entryIndex !== -1) {
        const updatedEntry = req.body;
        journalEntries[entryIndex] = { ...journalEntries[entryIndex], ...updatedEntry };

        res.json(journalEntries[entryIndex]);
    } else {
        res.status(404).json({ error: 'Entry not found' });
    }
});

router.delete('/journal_entries/:id', (req, res) => {
    const entryId = parseInt(req.params.id);
    const initialLength = journalEntries.length;
    journalEntries = journalEntries.filter((entry) => entry.id !== entryId);

    if (journalEntries.length < initialLength) {
        res.json({ message: 'Entry deleted successfully' });
    } else {
        res.status(404).json({ error: 'Entry not found' });
    }
});

export default router;