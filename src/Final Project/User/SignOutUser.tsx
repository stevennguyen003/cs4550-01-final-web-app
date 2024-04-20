import React from 'react';
import { signOutUser } from './client';

const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log('Sign out successful');
    } catch (err) {
      console.error('Error signing out', err);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOutButton;
