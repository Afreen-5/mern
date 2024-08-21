import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import MovieCard from "../components/Home/MovieCard";
import MovieCarousel from "../components/Home/MovieCarousel";

const Home: React.FC = () => {
  return (
    <>
      <div className="pt-16 w-full overflow-x-hidden bg-gradient-to-b from-stone-900 to-stone-600 text-white">
      <Header />
        <MovieCarousel />
        <div className="my-2">
          <MovieCard />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
