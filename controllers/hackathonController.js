const Hackathon = require("../models/Hackathon");
const Company = require("../models/Company");
const { Op } = require("sequelize");
const Participant = require("../models/Participant");
const User = require('../models/User');

// Get all hackathons
const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.findAll();
    res.json({ message: "Success", data: hackathons });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new hackathon
const createHackathon = async (req, res) => {
  const {
    company_id,
    name,
    start_date,
    end_date,
    max_participants,
    registration_start_date,
    registration_end_date,
    technology_stack,
  } = req.body;

  try {
    const currentDate = new Date();
    const registrationOpen = currentDate < new Date(registration_end_date);
    const newHackathon = await Hackathon.create({
      name,
      start_date,
      end_date,
      max_participants,
      registration_open : registrationOpen,
      registration_start_date,
      registration_end_date,
      technology_stack,
      company_id,
    });

    res
      .status(201)
      .json({ message: "Hackathon created successfully", data: newHackathon });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a hackathon
const updateHackathon = async (req, res) => {
  const hackathonId = req.params.id;
  const {
    company_id,
    name,
    start_date,
    end_date,
    max_participants,
    registration_open,
    registration_start_date,
    registration_end_date,
    technology_stack,
  } = req.body;

  try {
    const hackathon = await Hackathon.findByPk(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    await hackathon.update({
      company_id,
      name,
      start_date,
      end_date,
      max_participants,
      registration_open,
      registration_start_date,
      registration_end_date,
      technology_stack,
    });
    res.json({ message: "Hackathon updated successfully", data: hackathon });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a hackathon
const deleteHackathon = async (req, res) => {
  const hackathonId = req.params.id;

  try {
    const hackathon = await Hackathon.findByPk(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    await hackathon.destroy();
    res.json({ message: "Hackathon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Search hackathons by name or technology stack
const searchHackathons = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const hackathons = await Hackathon.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchQuery}%` } },
          { technology_stack: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      },
    });

    if (hackathons.length === 0) {
      return res.json({ message: "No hackathons found" });
    }

    res.json({ message: "Hackathons found", data: hackathons });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Register a user for a hackathon
const registerForHackathon = async (req, res) => {
    const userId = req.user.id;
    const hackathonId = req.params.hackathonId;
  
    try {
      const hackathon = await Hackathon.findByPk(hackathonId);
      if (!hackathon || !hackathon.registration_open) {
        return res.status(404).json({ message: 'Hackathon not found or registration closed' });
      }
  
      // Check if the hackathon slot is full
      const registeredParticipantsCount = await Participant.count({
        where: { hackathon_id: hackathonId },
      });
      if (registeredParticipantsCount >= hackathon.max_participants) {
        return res.status(400).json({ message: 'Hackathon slot is full' });
      }
  
      const user = await User.findByPk(userId);
  
      // Check if the registration date has passed
      const currentDate = new Date();
      if (currentDate > hackathon.registration_end_date) {
        return res.status(400).json({ message: 'Registration date has passed' });
      }
  
      // Register the user for the hackathon in the Participants table
      await Participant.create({
        user_id: userId,
        hackathon_id: hackathonId,
        experience_level: user.experience_level,
        technology_stack: user.technology_stack,
        business_unit: user.business_unit,
      });
  
      // Increment the registered_participants count for the hackathon in the Hackathon table
      await hackathon.increment('registered_participants');
  
      res.json({ message: 'Successfully registered for the hackathon' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  getAllHackathons,
  createHackathon,
  updateHackathon,
  deleteHackathon,
  searchHackathons,
  registerForHackathon
};
