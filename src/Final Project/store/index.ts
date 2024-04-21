import { configureStore } from "@reduxjs/toolkit";
// import modulesReducer from "../Feed/reducer";
export interface SenzuState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
}
const store = configureStore({
  reducer: {
    
  }
});


export default store;