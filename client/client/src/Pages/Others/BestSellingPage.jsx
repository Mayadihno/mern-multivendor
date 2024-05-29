import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductData from "../../HomeComp/ProductData";
import { productData } from "../../Static/data";
const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);

  return (
    <React.Fragment>
      <div className={`${styles.section} mt-14`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductData data={i} key={index} />)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BestSellingPage;
