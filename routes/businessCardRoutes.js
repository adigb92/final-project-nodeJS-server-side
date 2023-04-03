const express = require('express');
const router = express.Router();
const BusinessCard = require('../models/BusinessCard');
const User = require('../models/User');
const auth = require('../middleware/auth');



// GET endpoint to retrieve a user's full details
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

// POST endpoint to open a business card
router.post('/business-cards', auth, async (req, res) => {
    const {
        businessName,
        businessDescription,
        businessAddress,
        businessPhoneNumber,
        businessImageURL,
    } = req.body;

    try {
        const newCard = new BusinessCard({
            id_user: req.user.id,
            businessName,
            businessDescription,
            businessAddress,
            businessPhoneNumber,
            businessImageURL,
        });

        const card = await newCard.save();
        res.status(201).json(card);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

// GET endpoint to retrieve all business cards of the authenticated user
router.get('/my-business-cards', auth, async (req, res) => {
    try {
        const cards = await BusinessCard.find({ id_user: req.user.id });

        if (!cards) {
            return res.status(404).json({ msg: 'No business cards found' });
        }

        res.json(cards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET endpoint to retrieve a specific visiting card by ID
router.get('/business-cards/:id', auth, async (req, res) => {
    try {
        const card = await BusinessCard.findById(req.params.id);

        if (!card) {
            return res.status(404).json({ msg: 'Business card not found' });
        }

        res.json(card);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// PUT endpoint to edit a specific visiting card by ID
router.put('/business-cards/:id', auth, async (req, res) => {
    const { businessName, businessDescription, businessAddress, businessPhoneNumber, businessImageUrl } = req.body;

    // Check if all required fields are provided
    if (!businessName || !businessAddress || !businessPhoneNumber) {
        return res.status(400).json({ msg: 'All required fields are missing' });
    }


    try {
        const card = await BusinessCard.findById(req.params.id);

        if (!card) {
            return res.status(404).json({ msg: 'Business card not found' });
        }

        if (card.id_user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        card.businessName = businessName;
        card.businessDescription = businessDescription;
        card.businessAddress = businessAddress;
        card.businessPhoneNumber = businessPhoneNumber;
        card.businessImageUrl = businessImageUrl;

        await card.save();
        res.json(card);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

// DELETE endpoint to delete a specific visiting card by ID
router.delete('/business-cards/:id', auth, async (req, res) => {
    try {
        const card = await BusinessCard.findById(req.params.id);

        if (!card) {
            return res.status(404).json({ msg: 'Business card not found' });
        }

        if (card.id_user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await BusinessCard.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Business card removed' });
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

module.exports = router;
