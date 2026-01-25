import mongoose from 'mongoose';

const WeightSchema = new mongoose.Schema({
  date: Date,
  weight: Number,
});

export default mongoose.models.Weight || mongoose.model('Weight', WeightSchema);