import React from "react";
import { Hero } from "./Hero";
import Categories from "../HomeComp/Categories";
import BestDeals from "../HomeComp/BestDeals";
import FeaturedProduct from "../HomeComp/FeaturedProduct";
import Event from "../HomeComp/Event";
import Sponsored from "../HomeComp/Sponsored";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <Categories />
      <BestDeals />
      <Event />
      <FeaturedProduct />
      <Sponsored />
    </React.Fragment>
  );
};

export default Home;
