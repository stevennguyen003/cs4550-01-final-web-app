import { Link } from "react-router-dom";
import LoginSidebar from "../Sidebar/LoginSidebar";
import "./index.css";
import { useParams } from "react-router";
import CreateAccount from "../Sidebar/CreateAccount";
import Header from "../Header";

function LandingPage() {
  const { param } = useParams();
  const renderPage = () => {
    switch (param) {
      case "Login":
        return <LoginSidebar />;
      case "CreateAccount":
        return <CreateAccount />;
      default:
        return <LoginSidebar />;
    }
  };
  return (
    <>

        <div className="d-flex justify-content-center text-center container-fluid h-100">
          <div className="row ">
            <div className="col-lg-3 d-none d-lg-block main-title">
              <h1 className="text-gradient" style={{ fontSize: "60px" }}>
                Senzu
              </h1>
              <br />
              <p className="text-gradient" style={{ fontSize: "25px" }}>
                Share you fitness journey with Senzu, a social media where gym
                enthusiasts connect, compete, learn from others and celebrate
                milestones together! Powered by a personalized AI trainer ready
                to answer your every question!
              </p>
            </div>
            <div className="col-lg-3 box d-flex align-items-center justify-content-center">{renderPage()}</div>
          </div>
        </div>

    </>
  );
}
export default LandingPage;
