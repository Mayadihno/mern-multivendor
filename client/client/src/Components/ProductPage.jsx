import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductData from "../HomeComp/ProductData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions";

const ProductPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllProducts);
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProducts);
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts, categoryData, dispatch]);

  return (
    <React.Fragment>
      <div className={`${styles.section} mt-14`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductData data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] font-bold text-[30px]">
            No Product Available!
          </h1>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ProductPage;
