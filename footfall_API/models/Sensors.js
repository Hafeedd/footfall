import mongoose from "mongoose";

const newSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: [true, "Sensor ID is required"],
  },
  count: {
    type: Number,
    required: [true, "Count is required"],
  },
  timestamp: {
    type: Date,
    required: [true, "Timestamp is required"],
    default: Date.now,
  },
});

export const SensorModel = mongoose.model("Sensor", newSchema);
