import Course from '../models/courseModel.js'
import asyncHandler from 'express-async-handler'



// @desc Fetch all courses
// @route GET /api/courses
// @access Public
const getCourse = asyncHandler(async(req, res) =>{
    const courses =  await Course.find({})
    res.json(courses)
})


// @desc Fetch syngle course
// @route GET /api/courses/:id
// @access Public
const getCourseById = asyncHandler(async(req, res) =>{
    const course = await Course.findById(req.params.id)
    if (course){
        res.json(course)
    }else{
        res.status(404)
        throw new Error('Course Not Found')
    }
})

export {
    getCourse,
    getCourseById,
}