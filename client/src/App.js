import React from "react"
import {DataProvider} from "./GlobalState"
import {BrowserRouter as Router} from "react-router-dom"
import Header from "./components/Header/Header"
import Pages from "./components/Page/MainPage"
import Footer from "./components/footer/Footer"
import Slider from "./components/Slider/Slider"
function App() {
  return (
    <DataProvider>
      <Router>
        <div className = "App">
          <Header />
          
          <Pages />
          <Footer />
          
        </div>
      </Router>
    </DataProvider>

  );
}

export default App;
