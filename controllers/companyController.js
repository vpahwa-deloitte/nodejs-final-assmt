const Company = require("../models/Company");

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json({ message: "Success", data: companies });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new company
const createCompany = async (req, res) => {
  const { name } = req.body;

  try {
    const newCompany = await Company.create({ name });
    res
      .status(201)
      .json({ message: "Company created successfully", data: newCompany });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  const companyId = req.params.id;
  const { name } = req.body;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.update({ name });
    res.json({ message: "Company updated successfully", data: company });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.destroy();
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
};
