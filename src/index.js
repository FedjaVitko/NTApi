import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import booksRoute from './routes/books';

const app = express();
mongoose.connect('mongodb://localhost/novum-testamentum', { useMongoClient: true });

app.use('/api/book', booksRoute);
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(8080, () => console.log('Running on localhost: 8080'));