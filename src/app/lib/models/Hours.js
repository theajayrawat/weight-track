import mongoose from 'mongoose';

const HourSchema = new mongoose.Schema({
  date: Date,
  devHour: Number,
  dsaHour: Number,
});

export default mongoose.models.Hour || mongoose.model('Hour', HourSchema);