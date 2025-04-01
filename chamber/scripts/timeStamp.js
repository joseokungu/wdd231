function timeStamp() {
    // Get the current date and time
    const now = new Date();
    // Define the options for the date and time
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "America/Phoenix",
        timeZoneName: "short",
    };
    // Format the date and time
    const timestamp = now.toLocaleString("en-US", options);
    // Display the timestamp
    document.getElementById("timestamp").innerText = `Timestamp: ${timestamp}`;
}


