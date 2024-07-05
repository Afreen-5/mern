import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import MovieCard from "../components/Home/MovieCard";
import MovieCarousel from "../components/Home/MovieCarousel";

const Home: React.FC = () => {
    return(
        <>
            <Header/>
            <MovieCarousel/>
            <MovieCard />
            <Footer/>
        </>
    )
}

export default Home;