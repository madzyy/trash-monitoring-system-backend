const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const BinModel = require('../models/binModel');

// Serial Port Configuration
const port = new SerialPort({
  path: 'COM11', // Replace with your actual COM port
  baudRate: 9600,
});

// Data Parser
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Log Connection
port.on('open', () => {
  console.log('Serial Port Opened.');
});

// Handle Incoming Data
parser.on('data', (line) => {
  try {
    console.log('Received from COM port:', line);

    // Parse the data
    const data = line.trim();
    const match = data.match(/Distance: (\d+).*Lat: ([-\d.]+).*Lon: ([-\d.]+)/);

    if (match) {
      const distance = parseInt(match[1], 10);
      const latitude = parseFloat(match[2]);
      const longitude = parseFloat(match[3]);

      console.log('Parsed data:', { distance, latitude, longitude });

      // Check if a bin exists at the given location
      BinModel.findByLocation(latitude, longitude, (err, results) => {
        if (err) {
          console.error('Error querying bins:', err.message);
          return;
        }

        if (results.length > 0) {
          // Bin exists, update its level
          BinModel.update(
            { latitude, longitude, level: distance },
            (err, result) => {
              if (err) console.error('Error updating bin:', err.message);
              else console.log('Bin updated:', result);
            }
          );
        } else {
          // Bin does not exist, insert a new entry
          const description = `Bin added from Proteus at (${latitude}, ${longitude})`;
          BinModel.add(
            { latitude, longitude, level: distance, description },
            (err, result) => {
              if (err) console.error('Error inserting bin:', err.message);
              else console.log('Bin inserted:', result);
            }
          );
        }
      });
    } else {
      console.error('Data format not recognized:', line);
    }
  } catch (err) {
    console.error('Error processing COM port data:', err.message);
  }
});

// Handle Errors
port.on('error', (err) => {
  console.error('Error on COM port:', err.message);
});
