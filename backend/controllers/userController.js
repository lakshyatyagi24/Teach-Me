import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Student from '../models/studentModel.js'
import Teacher from '../models/teacherModel.js'

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

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user._id) 

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password)
        {
            user.password = req.body.password || user.password
        }

        const updatedUser = await user.save()

        res.json({
            _id:updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token : generateToken(updatedUser._id),
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Register a new student
// @route POST /api/users/register/student
// @access Public
const registerStudent = asyncHandler(async (req, res) => {
    const { name, email, password, studentId, studentDepartment, phone } = req.body;

    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    // Create a new user if email doesn't exist
    const user = await User.create({
        name,
        email,
        password, // Password hashing is handled in the User model's pre-save middleware
    });

    if (user) {
        // Link the Student record with the User record via user field
        const student = await Student.create({
            user: user._id,
            studentId,
            studentDepartment,
            phone,
        });

        if (student) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid student data');
        }
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Register a new teacher
// @route   POST /api/users/register/teacher
// @access  Public
const registerTeacher = asyncHandler(async (req, res) => {
    const { name , email , password ,teacherId,teacherDepartment,course,price,grade,phone} = req.body

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User email already exists');
    }

    const teacherExists = await Teacher.findOne({ teacherId: teacherId });

    if (teacherExists) {
        res.status(400);
        throw new Error('TeacherID already exists');
    }

    const user = await User.create({
        name : name,
        email : email,
        password: password,
        role: 'teacher',
    });

    const teacher = await Teacher.create({
        user: user._id,
        teacherId: teacherId,
        teacherDepartment: teacherDepartment,
        course : course,
        price : price,
        grade : grade,
        phone : phone,
    })

    if (user && teacher){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            /*studentId:teacher.studentId,
            studentDepartment:teacher.studentDepartment,
            phone:teacher.phone,
            role: user.role,*/
            token : generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid teacher data')
    }
});

export{
    authUser,
    getUserProfile,
    registerUser,
    getAllUser,
    registerStudent,
    registerTeacher,
    updateUserProfile,
}