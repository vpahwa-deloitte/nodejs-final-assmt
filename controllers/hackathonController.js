const Hackathon = require("../models/Hackathon");
const Company = require("../models/Company");
const { Op } = require("sequelize");

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
    registration_open,
    registration_start_date,
    registration_end_date,
    technology_stack,
  } = req.body;

  try {
    const newHackathon = await Hackathon.create({
      name,
      start_date,
      end_date,
      max_participants,
      registration_open,
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

  console.log(searchQuery);

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

module.exports = {
  getAllHackathons,
  createHackathon,
  updateHackathon,
  deleteHackathon,
  searchHackathons,
};
