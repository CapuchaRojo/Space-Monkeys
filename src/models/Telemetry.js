import mongoose from "mongoose";

const telemetrySchema = new mongoose.Schema({
    event: String,
    timestamp: { type: Date, default: Date.now },
    metadata: Object,
  });

export default mongoose.model('Telemetry', telemetrySchema);
