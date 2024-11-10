export default function timeAgo(isoDateString) {
  if (!isoDateString) {
    return "-";
  } else {
    const inputDate = new Date(isoDateString); // Convert ISO string to Date object
    const today = new Date(); // Get the current date

    // Calculate the difference in time between the two dates (in milliseconds)
    const timeDifference = today - inputDate;

    // Convert the time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 0) {
      // If the difference is more than a day, return days ago
      const formattedMonth = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const formattedDay = inputDate.getDate().toString().padStart(2, "0");

      // Format the input date as YYYY-MM-DD
      const formattedDate =
        inputDate.getFullYear() + "-" + formattedMonth + "-" + formattedDay;

      // Return the number of days ago, handling singular/plural
      const daysText = daysDifference === 1 ? "day ago" : "days ago";
      return `${daysDifference} ${daysText}`;
    } else {
      // If the difference is less than a day, calculate seconds difference
      const secondsDifference = Math.floor(timeDifference / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);

      if (hoursDifference > 0) {
        // If hours are present, show hours
        const hoursText = hoursDifference === 1 ? "hour ago" : "hours ago";
        return `${hoursDifference} ${hoursText}`;
      } else if (minutesDifference > 0) {
        // If minutes are present, show minutes
        const minutesText = minutesDifference === 1 ? "minute ago" : "minutes ago";
        return `${minutesDifference} ${minutesText}`;
      } else {
        // Otherwise, show seconds
        const secondsText = secondsDifference === 1 ? "second ago" : "seconds ago";
        return `${secondsDifference} ${secondsText}`;
      }
    }
  }
}

// Example usage
// const result = timeAgo("2024-10-26T12:43:53.402Z");
// console.log(result); // Outputs: "x days ago" or "x hours ago" or "x minutes ago" or "x seconds ago"
