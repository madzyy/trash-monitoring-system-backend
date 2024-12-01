const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const truckRoutes = require('./routes/truckRoutes');
const binRoutes = require('./routes/binRoutes');
const collectorRoutes = require('./routes/collectorRoutes');
const authRoutes = require('./routes/authRoutes');
require('./services/serialService'); // Import and run the serial port listener

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/trucks', truckRoutes);
app.use('/api/bins', binRoutes);
app.use('/api/garbagecollectors', collectorRoutes);
app.use('/api/auth', authRoutes);


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
