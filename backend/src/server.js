const express = require('express');
const cors = require('cors');
const fs = require('fs');

const uploadRoutes = require('./routes/upload');
const captionRoutes = require('./routes/captions');
const renderRoutes = require('./routes/render');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dirs = ['uploads', 'outputs', 'temp'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use('/uploads', express.static('uploads'));


app.use('/api/upload', uploadRoutes);
app.use('/api/captions', captionRoutes);
app.use('/api/render', renderRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Remotion Captioning Demo API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;