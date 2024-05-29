import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProduct from "./SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  // const productName = name.replace(/-/g, " ");
  // const { name } = useParams();
  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents?.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts?.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, id, data, eventData, allEvents]);

  return (
    <React.Fragment>
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
    </React.Fragment>
  );
};

export default ProductDetailsPage;
