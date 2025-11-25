import NavBar from "./NavBar";
import Hero from "./Hero";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      {/* <NavBar /> */}
      <Hero />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
