import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  teacherId: { type: String, required: true },
  dates: [String],
  times: [String],
  bookings: {
    type: Map,
    of: [String]
  }
});

const Schedule = mongoose.model('Schedule',scheduleSchema)

export default Schedule

