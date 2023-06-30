import mongoose from 'mongoose';

const { Schema } = mongoose;

const rescheduleSchema = new Schema({
  docId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
  },
});

export default mongoose.model('rescheduleSchema', rescheduleSchema);
