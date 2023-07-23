const Company = require("../models/Company");
const {
  getAllCompanies,
  createCompany,
} = require("../controllers/companyController");

jest.mock("../models/Company");

describe("Company Controller", () => {
  describe("GET /companies", () => {
    it("should return all companies", async () => {
      const mockResponse = {
        json: jest.fn(),
      };

      Company.findAll = jest.fn(() =>
        Promise.resolve([{ name: "Company 1" }, { name: "Company 2" }])
      );

      await getAllCompanies({}, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Success",
        data: [{ name: "Company 1" }, { name: "Company 2" }],
      });
    });

    it("should handle server error", async () => {
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };

      Company.findAll = jest.fn(() => Promise.reject(new Error("Some error")));

      await getAllCompanies({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Server error",
      });
    });
  });

  describe("createCompany", () => {
    it("should create a new company and return 201 status code", async () => {
      const mockRequest = {
        body: { name: "New Company" },
      };

      Company.create.mockResolvedValue({ name: "New Company", id: 1 });

      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };

      await createCompany(mockRequest, mockResponse);

      expect(Company.create).toHaveBeenCalledWith({ name: "New Company" });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Company created successfully",
        data: { name: "New Company", id: 1 },
      });
    });
  });
});
