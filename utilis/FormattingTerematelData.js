const ProcessingData = (data) => {
    if (!data || typeof data !== "object") {
        throw new Error("Invalid telemetry data");
    }

    let averagedData = {};

    for (let key in data) {
        let value = data[key];

        if (key.toLowerCase().includes("time") || key === "timestamp") {
            averagedData[key] = typeof value === "number" ? new Date(value).toISOString() : value;
        } else if (typeof value === "number") {
            averagedData[key] = parseFloat(value.toFixed(2));
        } else {
            averagedData[key] = value;
        }
    }

    const cleanedData = averagedData.filter(entry => entry.value !== null);
    const formattedData = JSON.stringify(cleanedData, null, 2);
    return formattedData;
};

module.exports = ProcessingData;