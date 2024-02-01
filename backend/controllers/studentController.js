import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Student from '../models/studentModel.js'

// @desc Fetch all students
// @route GET /api/students
// @access Public
const getAllStudents = asyncHandler(async(req, res) =>{
    const student =  await Student.find({})
    res.json(student)
})

// @desc Fetch syngle student
// @route GET /api/student/:id
// @access Public
const getStudentById = asyncHandler(async(req, res) =>{
    const studentId = await Student.findById(req.params.id)
    if (studentId){
        res.json(studentId)
    }else{
        res.status(404)
        throw new Error('Student Not Found')
    }
})

// @desc Register a new user
// @route POST /api/students
// @access Public
const registerStudent = asyncHandler(async(req, res) =>{
    const { name , email , password ,studentId,studentDepartment,phone} = req.body

    const studentExists = await Student.findOne({email})

    if (studentExists){
        res.status(400)
        throw new Error('Student already exist')
    }

    const student = await Student.create({
        name,
        email,
        password,
        studentId,
        studentDepartment,
        phone
    })

    if (student){
        res.status(201).json({
            _id:student._id,
            name: student.name,
            email: student.email,
            studentId:student.studentId,
            studentDepartment:student.studentDepartment,
            phone:student.phone,
            isAdmin: student.isAdmin,
            token : generateToken(student._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid student data')
    }
})

export{
    getAllStudents,
    getStudentById,
    registerStudent,

}