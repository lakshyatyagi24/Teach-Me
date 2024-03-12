import Course from '../models/courseModel.js'
import asyncHandler from 'express-async-handler'
import Teacher from '../models/teacherModel.js'


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
    const {name , price , description , image /*, brand */, category ,/* countInStock,*/}= req.body

    const course = await Course.findById(req.params.id)

    if(course){
        course.name = name
        course.price = price
        course.description = description
        course.image = image
        //course.brand = brand
        course.category = category
        //course.countInStock = countInStock

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

// @desc Create a course
// @route POST /api/courses
// @access Private/Admin
const createCourse = asyncHandler(async(req, res) =>{
    const course = new Course({
        user : req.user._id,
        name : 'Sample name',
        image : '/images/ilan.jpg',
        category : 'Sample category',
        description : 'Sample description',
        reviews : [],
        rating : 0,
        numReviews : 0,
        price : 0,
    })

    const createdCourse = await course.save()
    res.status(201).json(createdCourse) 
})

// @desc Delete a course
// @route DELETE /api/courses/:id
// @access Private/Admin
const deleteCourse = asyncHandler(async(req, res) =>{
    const course = await Course.findById(req.params.id)

    if(course){
        await course.deleteOne()
        res.json({message : 'Course removed'})
    }else{
        res.status(404)
        throw new Error('Course Not found')
    }
})

// @desc Get courses for a teacher
// @route GET /api/courses/teacher/courses
// @access Private
const getCoursesForTeacher = asyncHandler(async (req, res) => {
    const teacherId = req.user._id; // Assuming you have teacherId in the user model or find it via associated Teacher model
    const id = teacherId.toString(); // Converts ObjectId to string
    
    // Find the teacher's courses using the Teacher model and return only the 'course' field
    const courses = await Teacher.find({ user: id }, 'course -_id');
    
    // Check if courses exist and map over them to return an array of course names
    if (courses && courses.length > 0) {
      const courseNames = courses.map(course => course.course);
      //console.log("courseName : " , courseNames)
      res.json(courseNames); // This will return an array like ['Algebra', 'Hedva']
    } else {
      res.status(404).send('No courses found for the specified teacher');
    }
  });
  


export {
    getCourse,
    getCourseById,
    updateCourse,
    createCourseReview,
    createCourse,
    deleteCourse,
    getCoursesForTeacher,

}