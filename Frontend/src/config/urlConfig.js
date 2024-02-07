let BASE_URL =
  process.env.NODE_ENV === "development" // implement .env file !!
    ? "http://localhost:5000"
    : "https://expensestracker-backend.onrender.com"; //! this is the render url 
export default BASE_URL;           //! remember to change it!! this is just an example