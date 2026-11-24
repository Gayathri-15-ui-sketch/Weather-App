import React from "react";

import Navbar from "./Component/Navbar";
import Weather from "./Component/Weather";
import Footer from "./Component/Footer";
import WeatherProvider from "./Context/WeatherProvider";

import "./App.css";

function App() {
    return (
        <WeatherProvider>
            <div className="app">
                <Navbar />

                <main>
                    <Weather />
                </main>

                <Footer />
            </div>
        </WeatherProvider>
    );
}
export default App;
