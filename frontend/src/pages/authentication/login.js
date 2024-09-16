import LoginForm from "../../components/FormLogin";
import Main from "../../components/Main";

// Login Component
const Login = ({ login }) => {
  return (
    <Main min_height={"80vh"}>
      <LoginForm login={login} />
    </Main>
  );
};

export default Login;
