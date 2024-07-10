import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import MovieCard from "../components/Home/MovieCard";
import MovieCarousel from "../components/Home/MovieCarousel";

const Home: React.FC = () => {
    return(
        <>
            <div className="w-screen h-screen overflow-x-hidden bg-gradient-to-b from-stone-900 to-stone-600 text-white">
            <Header/>
            <MovieCarousel/>
            <MovieCard />
            <Footer/>
            </div>
        </>
    )
}

export default Home;