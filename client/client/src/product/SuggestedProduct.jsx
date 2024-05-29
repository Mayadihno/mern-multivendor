/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import ProductData from "../HomeComp/ProductData";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [products, setProduct] = useState();
  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setProduct(d);
  }, []);

  return (
    <React.Fragment>
      <div className="">
        {data ? (
          <div className={`${styles.section} p-4`}>
            <h2
              className={`${styles.heading} mb-5 border-b text-[25px] font-[500]`}
            >
              Related product
            </h2>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {products &&
                products.map((i, index) => (
                  <ProductData data={i} key={index} />
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default SuggestedProduct;
