import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';

admin.initializeApp();
const db = admin.firestore();

const app = express();

app.get('/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

app.post('/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const doc = await db.collection('users').add({ email, name, createdAt: new Date() });
    res.status(201).json({ id: doc.id });
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

exports.api = functions.https.onRequest(app);
