import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Student from '../models/studentModel.js'
import Teacher from '../models/teacherModel.js'
import Schedule from '../models/scheduleModel.js'
import Course from '../models/courseModel.js'


// @desc Fetch all schedules
// @route GET /api/schedule/:courseId/:teacherId
// @access Private
const getSchedules = asyncHandler(async (req, res) => {
  const { courseId, teacherId } = req.params;
  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: 'Course not found.' });
  }

  const schedule = await Schedule.findOne({ course: course.name, teacher: teacherId });

  if (!schedule) {
    return res.status(404).json({ message: 'No schedule found for this course and teacher.' });
  }

  const formattedSchedule = schedule.slots.map(slot => ({
    date: slot.date,
    times: slot.times.map(timeSlot => ({
      time: timeSlot.time,
      booked: timeSlot.booked
    }))
  }));

  res.json(formattedSchedule);
});
/*const getSchedules = asyncHandler(async(req, res) =>{
  const { courseId, teacherId } = req.params;
  const course = await Course.findById(courseId); // This should be the actual course name
  console.log("courseName : " , course.name , " , teacherId : " , teacherId)
  try {
    // Modify the query to search by course name and teacher ID
    const schedule = await Schedule.findOne({ course: course.name, teacher: teacherId });
    
    // Add check to ensure the schedule exists
    if (!schedule) {
      res.status(404).json({ message: 'No schedule found for this course and teacher.' });
      return;
    }
    //console.log('Found schedule:', schedule);

    // Map over the slots to convert it to the format expected by the front end
    const formattedSchedule = schedule.slots.map(slot => ({
      date: slot.date,
      times: slot.times.map(timeSlot => timeSlot.time),
      bookings: {}, // Populate this with actual bookings if needed
    }));

    // Respond with the formatted schedule
    res.json(formattedSchedule);

  } catch (error) {
    res.status(500).send('Server Error');
  }
})*/

// In your controller for handling the booking
const bookTimeSlot = asyncHandler(async (req, res) => {
    const { courseId, teacherId, date, time } = req.body;
    // Find the schedule and update it
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { courseId, teacherId }, 
      { $addToSet: { [`bookings.${date}`]: time } }, // This ensures no duplicate time is added
      { new: true }
    );
    if (!updatedSchedule) {
      res.status(404);
      throw new Error('Schedule not found');
    }
    res.status(200).json(updatedSchedule);
  });

  // Add schedule
  // @desc Add schedule
  // @route POST /api/schedule/add
  // @access Private
  const addSchedule = asyncHandler(async (req, res) => {
    const { schedule, courseId } = req.body; // courseId should be sent from the frontend
    const teacherId = req.user._id;
    
    console.log('Adding schedule for course:', courseId ,',Teacher Id :',teacherId.toString(), ',Schedule:', schedule);
    
    // Transform schedule state to the nested structure
    const slots = Object.entries(schedule).map(([date, times]) => ({
      date,
      times: times.map(time => ({ time }))
    }));
    
    try {
      const newSchedule  = new Schedule({
        _id: teacherId,
        teacher: teacherId,
        course: courseId, // Save the courseId to the schedule
        slots: slots
      });
  
      const createdSchedule = await newSchedule.save();
      res.status(201).json(createdSchedule);
    } catch (error) {
      // Log the error and send a 500 response
      console.error('Error adding schedule:', error);
      res.status(500).send('Server Error');
    }
  });

  // Update schedules
  // @desc Update schedules
  // @route PUT /api/schedule/update
  // @access Private
  const updateSchedules = asyncHandler(async (req, res) => {
    const { date, time, isBooked } = req.body;
    const teacherId = req.user._id;

    const updatedSchedule = await Schedule.findOne({ teacher: teacherId });
    if (!updatedSchedule) {
      res.status(404).send('Schedule not found');
      return;
    }

    const slot = updatedSchedule.slots.find(slot => slot.date === date);
    if (slot) {
      const timeSlot = slot.times.find(t => t.time === time);
      if (timeSlot) {
        timeSlot.booked = isBooked;
      }
    }

    await updatedSchedule.save(); // Save the updated schedule to the database
    res.json(updatedSchedule);
});

  

/*const bookTimeSlot = asyncHandler(async(req, res) =>{
    const { courseId, teacherId, date, time } = req.body;
    try {
      const schedule = await Schedule.findOne({ courseId, teacherId });
      if (!schedule) {
        return res.status(404).send('Schedule not found');
      }
      if (schedule.bookings[date] && schedule.bookings[date].includes(time)) {
        return res.status(400).send('This time slot is already booked.');
      }
      schedule.bookings[date] = [...(schedule.bookings[date] || []), time];
      await schedule.save();
      res.status(200).send('Time slot booked successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
}
)*/

export { getSchedules, bookTimeSlot , addSchedule , updateSchedules }
