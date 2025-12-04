function getCurrentTime() {
  const now = new Date(); // Get the current date and time
  const hours = now.getHours(); // Get the hour of the day (0-23)

  if (hours >= 5 && hours < 12) {
    return "Morning";
  } else if (hours >= 12 && hours < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}

export default getCurrentTime;
