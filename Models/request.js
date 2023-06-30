import mongoose from 'mongoose';

const { Schema } = mongoose;

const requestSchema = new Schema({
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
    required: true,
  },
});

export default mongoose.model('Request', requestSchema);
