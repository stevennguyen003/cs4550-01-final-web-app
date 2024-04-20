import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyPublic, setPrivacyPublic] = useState(true);

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handlePrivacyToggle = () => {
    setPrivacyPublic(!privacyPublic);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>
      <div className="settings-body">
        <div className="settings-section">
          <h2>Account</h2>
          <button
            onClick={handleNotificationToggle}
            className={`settings-button ${notificationsEnabled ? "enabled" : "disabled"}`}
          >
            {notificationsEnabled ? "Disable" : "Enable"} Notifications
          </button>
        </div>
        <div className="settings-section">
          <h2>Privacy</h2>
          <button
            onClick={handlePrivacyToggle}
            className={`settings-button ${privacyPublic ? "enabled" : "disabled"}`}
          >
            {privacyPublic ? "Set to Private" : "Set to Public"}
          </button>
        </div>
      </div>
      <div className="settings-footer">
        <Link to="/profile" className="back-to-profile-button">Back to Profile</Link>
      </div>
    </div>
  );
}

export default SettingsPage;
