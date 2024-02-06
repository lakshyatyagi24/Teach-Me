import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc Fetch all users
// @route GET /api/users
// @access Public
const getAllUser = asyncHandler(async(req, res) =>{
    const user =  await User.find({})
    res.json(user)
})

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async(req, res) =>{
    const { email , password } = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token : generateToken(user._id),
        })
    }
    else{
        res.status(401)
        throw new Error ('Invalid email or password')
    }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) =>{
    const { name , email , password } = req.body

    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token : generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user._id) 

    if(user){
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Register a new student
// @route POST /api/students
// @access Public
const registerStudent = asyncHandler(async(req, res) =>{
    const { name , email , password ,role} = req.body

    const studentExists = await Student.findOne({email})

    if (studentExists){
        res.status(400)
        throw new Error('Student already exist')
    }

    const user = await Student.create({
        name,
        email,
        password,
        role
    })

    if (user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token : generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid userStudent data')
    }
})

// @desc    Register a new teacher
// @route   POST /api/users/register/teacher
// @access  Public
const registerTeacher = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('UserTeacher already exists');
    }
  
    const teacherExists = await Teacher.findOne({ teacherName: teacherName });
  
    if (teacherExists) {
      res.status(400);
      throw new Error('Teacher Name already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
      role: 'teacher',
    });
  
    const teacher = await Teacher.create({
      user: user._id,
      teacherName: teacherName,
      email: user.email,
      studentId:teacher.studentId,
      studentDepartment:teacher.studentDepartment,
      phone:teacher.phone,
      token : generateToken(teacher._id),
    });
  
    if (user && teacher) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

export{
    authUser,
    getUserProfile,
    registerUser,
    getAllUser,
    registerStudent,
    registerTeacher,

}