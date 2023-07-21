const Participant = require('../models/Participant');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User')
const { Op } = require('sequelize');

// Get all participants of a specific hackathon
const getAllParticipants = async (req, res) => {
    const hackathonId = req.params.hackathonId;
  
    try {
      // Check if the hackathon exists
      const hackathon = await Hackathon.findByPk(hackathonId);
      if (!hackathon) {
        return res.status(404).json({ message: 'Hackathon not found' });
      }
  
      const participants = await Participant.findAll({
        where: { hackathon_id: hackathonId },
      });
  
      res.json({ message: 'Participants found', data: participants });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Create a new participant for a hackathon
const createParticipant = async (req, res) => {
    const hackathonId = req.params.hackathonId;
    const { user_id, experience_level, technology_stack, business_unit } = req.body;
  
    try {
      // Check if the hackathon exists
      const hackathon = await Hackathon.findByPk(hackathonId);
      if (!hackathon) {
        return res.status(404).json({ message: 'Hackathon not found' });
      }
  
      // Check if the user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newParticipant = await Participant.create({
        user_id,
        hackathon_id: hackathonId,
        experience_level,
        technology_stack,
        business_unit,
      });
  
      res.status(201).json({ message: 'Participant created successfully', data: newParticipant });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Update a participant's information
const updateParticipant = async (req, res) => {
  const participantId = req.params.id;
  const { experience_level, technology_stack, business_unit } = req.body;

  try {
    const participant = await Participant.findByPk(participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    await participant.update({
      experience_level,
      technology_stack,
      business_unit,
    });

    res.json({ message: 'Participant updated successfully', data: participant });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a participant from a hackathon
const deleteParticipant = async (req, res) => {
  const participantId = req.params.id;

  try {
    const participant = await Participant.findByPk(participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    await participant.destroy();
    res.json({ message: 'Participant deleted successfully', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get filtered participants for a hackathon
const getFilteredParticipants = async (req, res) => {
    const hackathonId = req.params.hackathonId;
    const { experience_level, technology_stack, business_unit } = req.query;
  
    try {
      const hackathon = await Hackathon.findByPk(hackathonId);
      if (!hackathon) {
        return res.status(404).json({ message: 'Hackathon not found' });
      }
  
      const filterConditions = {
        hackathon_id: hackathonId,
      };
  
      if (experience_level) {
        filterConditions.experience_level = experience_level;
      }
  
      if (technology_stack) {
        filterConditions.technology_stack = technology_stack;
      }
  
      if (business_unit) {
        filterConditions.business_unit = business_unit;
      }

      const participants = await Participant.findAll({
        where: filterConditions,
      });

      if (participants.length === 0) {
        return res.json({ message: 'No participants found for the given filters', data: participants });
      }
  
      res.json({ message: 'Filtered participants found', data: participants });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  getAllParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
  getFilteredParticipants
};
