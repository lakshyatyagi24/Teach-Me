import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema({
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Teacher' 
  },
  course: { 
    type: String, 
    required: true,
  },
  dates: [String],
  times: [String],
  bookings: {
    type: Map,
    of: [String]
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;

