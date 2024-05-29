/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles";

const Dropdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (i) => {
    setDropDown(false);
    navigate(`/products?category=${i.title}`);
    window.location.reload();
  };
  return (
    <React.Fragment>
      <div className="pb-4 w-[270px] bg-white absolute z-30 shadow-sm rounded-b-md">
        {categoriesData &&
          categoriesData.map((i, index) => {
            return (
              <div
                className={`${styles.normalFlex}`}
                key={index}
                onClick={() => handleSubmit(i)}
              >
                <img
                  src={i.image_Url}
                  className=" w-[25px] h-[25px] object-contain ml-[10px] select-none"
                  alt=""
                />
                <h3 className=" cursor-pointer m-3 select-none">{i.title}</h3>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Dropdown;
