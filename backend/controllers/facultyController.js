import asyncHandler from "express-async-handler";
import Faculty from "../models/facultyModel.js";

const getAllFacultyAdmin = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(400);
    throw new Error("You are not allowed");
  }
  const allFaculty = await Faculty.find({});
  res.json(allFaculty);
});
const getAllFaculty = asyncHandler(async (req, res) => {
  const allFaculty = await Faculty.find({});
  const facultyObject = allFaculty.reduce((acc, facultyMember) => {
    const { role } = facultyMember;

    if (!acc[role]) {
      acc[role] = [];
    }

    acc[role].push(facultyMember);
    return acc;
  }, {});
  res.json(facultyObject);
});
const addFaculty = asyncHandler(async (req, res) => {
  console.log("addFaculty");
  if (req.user.role !== "admin") {
    res.status(400);
    throw new Error("You are not allowed");
  }
  const { name, role } = req.body;
  if ((!name, !role)) {
    res.status(400);
    throw new Error("Incomplete Data");
  }
  const faculty = await Faculty.create({ name, role });
  return res.json(faculty);
});
const deleteFaculty = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(400);
    throw new Error("You are not allowed");
  }
  const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
  if (!deletedFaculty) {
    return res.status(404).json({ message: "Faculty not found" });
  }
  return res.json({ message: "Faculty deleted successfully", deletedFaculty });
});

export { getAllFaculty, addFaculty, deleteFaculty, getAllFacultyAdmin };
