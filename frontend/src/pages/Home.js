import HomeCom from "../components/Home";
import Main from "../components/Main";

// Login Component
const Home = ({ cart, setCart, products, setProducts }) => {
  return (
    <Main min_height={"80vh"}>
      {
        <HomeCom
          cart={cart}
          setCart={setCart}
          products={products}
          setProducts={setProducts}
        />
      }
    </Main>
  );
};

export default Home;
