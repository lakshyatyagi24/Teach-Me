import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Student from '../models/studentModel.js'
import Teacher from '../models/teacherModel.js'
import Schedule from '../models/scheduleModel.js'

// Sample data for the schedule
const scheduleData = {
        "dates": [ "10.3", "11.3" , "12.3" , "13.3" , "14.3" ],
        "times": ["8:00", "9:00", "10:00", "11:00" , "12:00" , "13:00" , "14:00" , "15:00" , "16:00" , "17:00" , "18:00" , "19:00" , "20:00" ],
        "bookings": {
            "10.3": ["9:00"],
            "11.3": ["8:00", "11:00"],
            "12.3": ["10:00", "13:00"],
            "13.3": ["11:00", "14:00"],
            "14.3": ["12:00", "15:00"]
        }
  };

  const getScheduleForTeacher = (courseId, teacherId) => {
    // Fetch schedule from database or other data source based on courseId and teacherId
    return scheduleData; // This should be the actual schedule for the given teacher
  };


// @desc Fetch all schedules
// @route GET /api/schedule/:courseId/:teacherId
// @access Private
const getSchedules = asyncHandler(async(req, res) =>{
    const { courseId, teacherId } = req.params;
    try {
      // Fetch the schedule based on courseId and teacherId
      // Also, retrieve the teacher's name from the database
      const teacher = await Teacher.findById(teacherId).populate('user');
      const schedule = getScheduleForTeacher(courseId, teacherId);

      let teacherName = teacher.name;
      if (teacher.user) {
          teacherName = teacher.user.name;
      }

      // Include the teacher's name in the response
      res.json({
        ...schedule,
        teacherName// Assuming the teacher document has a 'name' field
      });
    } catch (error) {
      res.status(500).send('Server Error');
    }
})

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
    
    console.log('Adding schedule for course:', courseId,',Teacher Id :',teacherId.toString(), ',Schedule:', schedule);
    
    const dates = Object.keys(schedule);
    const times = Object.values(schedule).flat(); // Flatten the array of arrays to get a single array of times
    
    try {
      const createdSchedule = new Schedule({
        teacher: teacherId,
        course: courseId, // Save the courseId to the schedule
        dates: dates,
        times: times,
        bookings: {} // Initialize as an empty object or however you need
      });
  
      await createdSchedule.save();
      res.status(201).json(createdSchedule);
    } catch (error) {
      // Log the error and send a 500 response
      console.error('Error adding schedule:', error);
      res.status(500).send('Server Error');
    }
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

export { getSchedules, bookTimeSlot , addSchedule }
