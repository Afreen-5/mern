import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieTrailer from "./components/MovieTrailer";

const App: React.FC = () => {

  return(
    <>
    <div className="m-0 p-0 bg-gray-200">
      <div className="container mx-full">
        <Header />
        <MovieTrailer />
        <MovieCard />

        <Footer />
      </div>
    </div>
    </>
  )
}

export default App;