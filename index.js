const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path'); // ✅ Import path module
const destinationRoutes = require('./routes/destinationRoutes');

dotenv.config(); // ✅ No need for empty brackets

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Use API routes first
app.use('/api/destination', destinationRoutes);

// ✅ Serve the frontend build (Ensure `dist` exists in `globetrotter-frontend`)
const frontendPath = path.join(__dirname, "globetrotter-frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
