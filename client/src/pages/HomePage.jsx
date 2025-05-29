
import LayoutTemp from '../components/layout/LayoutTemp';
import FeaturedProduct from './../components/Home/FeaturedProduct.jsx';
import NewCollection from "./../components/Home/NewCollection.jsx"
import ShopByCategory from "../components/Home/ShopByCategory.jsx";

const HomePage = () => {

  
  return (
    <LayoutTemp title={"All Products - Best Offers"} >
 <FeaturedProduct/>
 <NewCollection/>
 <ShopByCategory/>
</LayoutTemp>
      )
};

export default HomePage;
