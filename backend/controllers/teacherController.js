import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Teacher from '../models/teacherModel.js'
import Course from '../models/courseModel.js'
import User from '../models/userModel.js'

// @desc Fetch all teachers
// @route GET /api/teachers
// @access Public
const getAllTeachers = asyncHandler(async(req, res) =>{
    const teacher =  await Teacher.find({})
    res.json(teacher)
})

// @desc Fetch all teachers that learn a specific course
// @route GET /api/teachers/course/:courseId
// @access Public
const getTeachers = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
        res.status(404);
        throw new Error('Course Not Found');
    }

    // Populate the 'user' field to get details from the User model
    const teachers = await Teacher.find({ course: new RegExp(`^${course.name}$`, 'i') }).populate('user');

    if (teachers.length === 0) {
        res.status(404);
        throw new Error('Teacher Not Found');
    } else {
        const teachersWithUserDetails = teachers.map((teacher) => {
            // Use the teacher's name if available; otherwise, use the user's name
            let teacherName = teacher.name;
            if (teacher.user) {
                teacherName = teacher.user.name;
            }

            // Ensure we don't return "User not found" if the teacher's name is available
           if (!teacherName) {
                teacherName = "User not found";
            }

            return {
                _id: teacher._id,
                name: teacherName, // Use the determined name
                teacherId: teacher.teacherId,
                teacherDepartment: teacher.teacherDepartment,
                course: teacher.course,
                price: teacher.price,
                grade: teacher.grade,
                phone: teacher.phone,
                image: teacher.image,
                createdAt: teacher.createdAt,
                updatedAt: teacher.updatedAt,
                __v: teacher.__v,
            };
        });

        res.json(teachersWithUserDetails);
    }
});




// @desc Fetch syngle teacher
// @route GET /api/teacher/:id
// @access Public
const getTeacherById = asyncHandler(async(req, res) =>{
    const teacherId = await Teacher.findById(req.params.id)
    if (teacherId){
        res.json(teacherId)
    }else{
        res.status(404)
        throw new Error('Teacher Not Found')
    }
})

// @desc Register a new teacher
// @route POST /api/teachers
// @access Public
const registerTeacher = asyncHandler(async(req, res) =>{
    const { name , email , password ,teacherId,teacherDepartment,course,price,grade,phone} = req.body

    const teacherExists = await Teacher.findOne({email})

    if (teacherExists){
        res.status(400)
        throw new Error('Teacher already exist')
    }

    const teacher = await Teacher.create({
        name,
        email,
        password,
        teacherId,
        teacherDepartment,
        course,
        price,
        grade,
        phone
    })

    if (teacher){
        res.status(201).json({
            _id:teacher._id,
            name: teacher.name,
            email: teacher.email,
            studentId:teacher.studentId,
            studentDepartment:teacher.studentDepartment,
            phone:teacher.phone,
            isAdmin: teacher.isAdmin,
            token : generateToken(teacher._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid teacher data')
    }
})

export{
    getAllTeachers,
    getTeacherById,
    registerTeacher,
    getTeachers,

}