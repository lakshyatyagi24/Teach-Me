import mongoose from 'mongoose'


const timeSlotSchema = new mongoose.Schema({
  time: String,
  booked: { type: Boolean, default: false }
});

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
  slots: [{
    date: String,
    times: [timeSlotSchema]
  }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;

