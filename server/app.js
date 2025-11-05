// --- Core imports ---
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const { engine: expressHandlebars } = require('express-handlebars');
const mongoose = require('mongoose');
const router = require('./router.js');

// --- App setup ---
const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// --- MongoDB setup ---
// Heroku/Atlas URL via env var, otherwise local dev DB
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/simpleModelsHW';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error('❌ Could not connect to MongoDB:', err);
    throw err;
  });

mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// --- Middleware ---
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(favicon(path.resolve(`${__dirname}/../client/img/favicon.png`)));

// --- View engine (Handlebars) ---
app.engine('handlebars', expressHandlebars({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(`${__dirname}/../views`));

// --- Routes ---
router(app);

// --- Start server ---
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`🚀 Listening on port ${port}`);
});
