// import '../assets/scss/style.scss'
import { Outlet } from "react-router-dom";
import Header from "../components/dash.header";
import Sidebar from "../components/dash.sidebar";
import { Container } from "reactstrap";
import CoursesList from "./coursesList";
import Users from "./users";

const Dashboard = ({ children }) => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        <div className="contentArea">
          <Header />
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
          {children}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
