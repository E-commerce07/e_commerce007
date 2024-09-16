import Main from "../components/Main";

// Login Component
const NotFound = () => {
  return (
    <Main min_height={"80vh"}>
      <div>
        <img
          style={{
            height: 100,
          }}
          alt="404 illustration"
          src="https://img.freepik.com/premium-vector/error-404-illustration-ecommerce-website-concept-illustration_288067-444.jpg"
        />
        <h1>404 Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
    </Main>
  );
};

export default NotFound;
