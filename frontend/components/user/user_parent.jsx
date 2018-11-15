import React from 'react';
import Navbar from '../navbar/navbar_container';
import UserShow from './user_show_container';

const UserParent = () => {
  return(
      <>
        <Navbar />
        <UserShow />
      </>
  );
};

export default UserParent;
