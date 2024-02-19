import Course from '../models/courseModel.js'
import asyncHandler from 'express-async-handler'



// @desc Fetch all courses
// @route GET /api/courses
// @access Public
const getCourse = asyncHandler(async(req, res) =>{
    const keyword = req.query.keyword ? {
        name : {
            $regex : req.query.keyword,
            $options : 'i'
        }
    } : {}

    const courses =  await Course.find({...keyword})
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

// @desc Update a course
// @route PUT /api/courses/:id
// @access Private/Admin
const updateCourse = asyncHandler(async(req, res) =>{
    const {name , price , description , image , brand , category , countInStock,}= req.body

    const course = await Course.findById(req.params.id)

    if(course){
        course.name = name
        course.price = price
        course.description = description
        course.image = image
        course.brand = brand
        course.category = category
        course.countInStock = countInStock

        const updateCourse = await course.save()
        res.json(updateCourse)
    }else{
        res.status(404)
        throw new Error('Course Not found')
    }
})

// @desc Create a new reviews
// @route POST /api/courses/:id/reviews
// @access Private
const createCourseReview = asyncHandler(async(req, res) =>{
    const {rating , comment}= req.body

    const course = await Course.findById(req.params.id)

    if(course){
        const alreadyReviewed = course.reviews.find(r=> r.user.toString()===req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Course already reviewed')
        }


        const review = {
            name : req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        course.reviews.push(review)

        course.newReviews = course.reviews.length

        course.rating = course.reviews.reduce((acc,item)=> item.rating+acc,0)/course.reviews.length

        await course.save()
        res.status(201).json({message : 'Review added'})
    }else{
        res.status(404)
        throw new Error('Course Not found')
    }
})

export {
    getCourse,
    getCourseById,
    updateCourse,
    createCourseReview,

}