import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import * as client from '../Profile/client';
import { useNavigate} from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleSignout = async () => {
    await client.signout();
    navigate("/Main/Login");
  }

  const [profile, setProfile] = React.useState('');
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await client.profile();
        setProfile(response._id);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);




    return (
        <header className="header-container">
            <Link to="/Home" className="header-logo">
                <h1 className="logo-text text-gradient">Senzu 🦇</h1>
            </Link>
            <div className="home-page-user" >
                    <Link className="text-gradient" to={`/Profile/${profile}`}>Profile</Link>
                    <button onClick={handleSignout} className="post-button" style={{WebkitMaskPositionY:"right"}}>Signout</button>
                    </div>
            {/* we can add other nav links this section*/}
        </header>
    );
}

export default Header;
