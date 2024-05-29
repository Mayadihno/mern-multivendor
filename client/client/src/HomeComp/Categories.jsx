import React from "react";
import styles from "../styles/styles";
import { brandingData, categoriesData } from "../Static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`flex justify-between w-full shadow-sm bg-white my-12 p-5 rounded-md branding`}
        >
          {brandingData &&
            brandingData.map((i, index) => {
              return (
                <div className="flex items-start" key={index}>
                  {<i.icon size={35} color={"##FFBB38"} className=" mt-1" />}
                  <div className="px-3">
                    <h3 className=" font-bold text-sm md:text-base">
                      {i.title}
                    </h3>
                    <p className="text-xs md:text-sm">{i.Description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i, index) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="flex items-center justify-between cursor-pointer overflow-hidden w-full h-[100px]"
                  key={index}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className="text-[15px] leading-[1.3]">{i.title}</h5>

                  <img
                    src={i.image_Url}
                    alt=""
                    className="w-[120px] object-cover"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Categories;
