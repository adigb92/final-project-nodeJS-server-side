require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const businessCardRoutes = require('./routes/businessCardRoutes');
const app = express();

app.use(express.json());
app.use(cors());

// set up connection to MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

app.use('/api/auth', authRoutes);
app.use('/api/cards', businessCardRoutes);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
