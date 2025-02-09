import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const sendTelemetryData = async (data) => {
  try {
    await axios.post(`${process.env.BASE_URL}/telemetry`, data);
  } catch (error) {
    console.error("Failed to send telemetry data", error);
  }
};

// Log Performance Metrics
export const logPerformance = () => {
  const pageLoadTime = performance.now();
  sendTelemetryData({
    type: "performance",
    pageLoadTime,
    timestamp: new Date().toISOString(),
  });
};

// Log User Interactions
export const logUserInteraction = (event) => {
  sendTelemetryData({
    type: "userInteraction",
    element: event.target.tagName,
    timestamp: new Date().toISOString(),
  });
};

// Log Errors
export const logError = (error, errorInfo) => {
  sendTelemetryData({
    type: "error",
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack || "",
  });
};
