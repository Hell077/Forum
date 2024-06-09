import './Root.css'
import {Provider} from "react-redux";
import store from "../Store/Store.js";
import {Routes} from "react-router-dom";
import React from "react";

function App() {
  return (
      <>
          <Routes>
              <Provider store={store}>

              </Provider>
          </Routes>
      </>
  )
}

export default App
