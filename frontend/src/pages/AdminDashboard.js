import Main from "../components/Main";
import AdminCom from "../components/AdminDashboard"
// Component
const AdminDashboard = () => {
  return (
    <Main min_height={"80vh"}>{<AdminCom/>}</Main>
  );
};

export default AdminDashboard;
