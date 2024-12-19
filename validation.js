function validateData(data) {
  const { date, description, weather, temperature } = data;

  if (typeof date !== "string" || date.trim() === "") {
      throw new Error("Date must be a non-empty string.");
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
      throw new Error("Date must be in the format mm/dd/yyyy.");
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date.");
  }
  const currentDate = new Date();
  if (parsedDate > currentDate) {
      throw new Error("Date must not be in the future.");
  }
  const minDate = new Date("1900-01-01");
  if (parsedDate < minDate) {
      throw new Error("Date is too far in the past.");
  }

  if (typeof description !== "string" || description.trim() === "" || description.length > 100) {
      throw new Error("Description must be a non-empty string with a maximum length of 100 characters.");
  }

  const allowedWeather = ["sunny", "rainy", "cloudy", "snowy", "windy", "stormy"];
  if (typeof weather !== "string" || !allowedWeather.includes(weather.toLowerCase())) {
      throw new Error(`Weather must be one of the following: ${allowedWeather.join(", ")}.`);
  }

  if (typeof temperature !== "number" || isNaN(temperature)) {
      throw new Error("Temperature must be a number.");
  }
  if (temperature < -100 || temperature > 100) {
      throw new Error("Temperature must be between -100 and 100 degrees Celsius.");
  }

  console.log("All data is valid.");
}

export default validateData