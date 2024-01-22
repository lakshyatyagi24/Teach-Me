import express from 'express'
const router = express.Router()
import Course from '../models/courseModel.js'
import asyncHandler from 'express-async-handler'
import { Error } from 'mongoose'


// @desc Fetch all courses
// @route GET /api/courses
// @access Public
router.get('',asyncHandler(async(req,res)=>{
    const courses =  await Course.find({})
    res.json(courses)
}))

// @desc Fetch syngle course
// @route GET /api/courses/:id
// @access Public
router.get('/:id',asyncHandler(async(req,res)=>{
    const course = await Course.findById(req.params.id)
    if (course){
        res.json(course)
    }else{
        res.status(404)
        throw new Error('Course Not Found')
    }
}))

export default router

