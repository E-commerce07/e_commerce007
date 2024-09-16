import SignUpForm from "../../components/FormSignUp";
import Main from "../../components/Main";

// SignUp Component
const Register = ({ register }) => {
  return (
    <Main min_height={"80vh"}>
      <SignUpForm register={register} />
    </Main>
  );
};

export default Register;
