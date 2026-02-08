import mongoose from 'mongoose';

const DistanceSchema = new mongoose.Schema({
  date: Date,
  distance: Number,
  time: Number,
});

export default mongoose.models.Distance || mongoose.model('Distance', DistanceSchema);