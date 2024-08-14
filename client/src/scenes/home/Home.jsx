import MainCarousel from "./MainCarousel";
import Subscription from "./Subscription";
import ShoppingList from "./ShoppingList";

const Home = () => {
  return (
    <div className="Home">
      <MainCarousel />
      <ShoppingList/>
      <Subscription/>
    </div>
  );
};

export default Home;
