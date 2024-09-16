// Import the individual reducers you created
import counterReducer from "./counterSlice";
// import anotherReducer from "./anotherSlice"; // Example of another reducer

// Combine the reducers into a rootReducer
const rootReducer = {
  // Add each reducer here under a key name
  counter: counterReducer, // The counter reducer
  // another: anotherReducer, // Another reducer
};

export default rootReducer;
