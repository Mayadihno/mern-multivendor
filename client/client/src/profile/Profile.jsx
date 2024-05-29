import React, { useState } from "react";
import styles from "../styles/styles";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import ProtectedRoute from "../ProtectedRoute";

const Profile = () => {
  const [active, setActive] = useState(1);
  return (
    <ProtectedRoute>
      <React.Fragment>
        <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}>
          <div className=" w-[50px] 800px:w-[335px] 800px:mt-0 sticky mt-[25%]">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
          <ProfileContent active={active} />
        </div>
      </React.Fragment>
    </ProtectedRoute>
  );
};

export default Profile;
