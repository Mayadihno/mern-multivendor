/* eslint-disable react/prop-types */
import React from "react";
import { navItems } from "../Static/data";
import styles from "../styles/styles";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <React.Fragment>
      <div className={` block 800px:${styles.normalFlex}`}>
        {navItems &&
          navItems.map((i, index) => {
            return (
              <div className="flex " key={index}>
                <Link
                  to={i.url}
                  className={` ${
                    active === index + 1
                      ? "text-[#17dd1f]"
                      : " text-black 800px:text-white"
                  } px-6 cursor-pointer font-[500] pb-[30px] 800px:pb-0`}
                >
                  {i.title}
                </Link>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Navbar;
