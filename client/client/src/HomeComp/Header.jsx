/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "../styles/styles";
import { Link, useLocation } from "react-router-dom";
import { categoriesData } from "../Static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend } from "../../../server";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import { RxCross1 } from "react-icons/rx";
const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();

  const handleSearchData = (e) => {
    const term = e.target.value;
    setSearch(term);
    const filteredproduct =
      allProducts &&
      allProducts?.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredproduct);
  };

  //to make navbar stay at the top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <React.Fragment>
      {location.pathname.includes("/shop") ? (
        ""
      ) : (
        <div className={`${styles.section}`}>
          <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
            <div className="">
              <Link to={"/"}>
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt=""
                />
              </Link>
            </div>
            {/* search box */}
            <div className="w-[50%] relative">
              <input
                type="text"
                placeholder="search for products...."
                value={search}
                onChange={handleSearchData}
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                  {searchData &&
                    searchData.map((i, index) => {
                      // const d = i.name;
                      // const productName = d.replace(/\s+/g, "-"); //to remove space
                      return (
                        <div key={index}>
                          <Link
                            to={`/product/${i._id}`}
                            onClick={() => setSearchData(null) && setSearch("")}
                          >
                            <div className="w-full flex items-start py-3">
                              <img
                                src={`${backend}${i?.image[0]}`}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              ) : null}
            </div>

            <div className={`${styles.button}`}>
              <Link to={seller ? "/shop/dashboard" : "/shop-create"}>
                <h1 className="flex items-center text-white">
                  {seller ? "Dashboard" : "Become Seller"}
                  <IoIosArrowForward className="mr-1" />
                </h1>
              </Link>
            </div>
          </div>
        </div>
      )}
      {location.pathname.includes("/shop") ? (
        ""
      ) : (
        <div
          className={`${
            active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
        >
          <div
            className={`${styles.section} relative justify-between ${styles.normalFlex}`}
          >
            {/* categories */}
            <div>
              <div
                onClick={() => setDropDown(!dropDown)}
                className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block"
              >
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button
                  className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                >
                  All Categories
                </button>
                <IoIosArrowDown
                  size={30}
                  className="absolute top-4 right-2 cursor-pointer"
                />
                {dropDown ? (
                  <Dropdown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>
            {/* navitems */}
            <div className={`${styles.normalFlex}`}>
              <Navbar active={activeHeading} />
            </div>
            {/* cart and wishlist icon */}
            <div className="flex">
              <div
                className=" relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute top-0 right-0 rounded-full bg-[#3bc177] w-4 text-center leading-tight h-4 p-0 m-0 text-white font-mono text-[12px]">
                  {wishlist?.length}
                </span>
              </div>
              <div
                className=" relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(!openCart)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute top-0 right-0 rounded-full bg-[#3bc177] w-4 text-center leading-tight h-4 p-0 m-0 text-white font-mono text-[12px]">
                  {cart?.length}
                </span>
              </div>
              <div className=" relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to={"/profile"}>
                    <img
                      src={`${backend}${user?.avatar}`}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <FaRegCircleUser size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
              {/* cart pop up */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
              {/* wishlist pop up */}
              {openWishList ? (
                <Wishlist setOpenWishList={setOpenWishList} />
              ) : null}
            </div>
          </div>
        </div>
      )}
      {/* mobile navbar */}
      {location.pathname.includes("/shop") ? (
        " "
      ) : (
        <div className="w-full h-[60px] fixed z-50 bg-[#fff] top-0 left-0 shadow-sm 800px:hidden">
          <div className="flex items-center w-full justify-between">
            <div className="">
              <BiMenuAltLeft
                size={40}
                className="ml-1 mt-2"
                onClick={() => setOpenMenu(true)}
              />
            </div>
            <div>
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt=""
                  className="mt-3 cursor-pointer"
                />
              </Link>
            </div>
            <div>
              <div
                className="relative mr-[20px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} className="ml-1 mt-2" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                  {cart?.length}
                </span>
              </div>
            </div>
          </div>
          {/* toggle hamburger menu */}
          {openMenu && (
            <div
              className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
            >
              <div className="fixed w-[80%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-between flex pr-3">
                  <div>
                    <div
                      className="relative mr-[15px]"
                      onClick={() => setOpenMenu(false)}
                    >
                      <AiOutlineHeart size={30} className="mt-5 ml-3" />
                      <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                        1
                      </span>
                    </div>
                  </div>
                  <RxCross1
                    size={30}
                    className="ml-4 mt-5"
                    onClick={() => setOpenMenu(false)}
                  />
                </div>

                <div className="my-8 w-[92%] m-auto h-[40px] relative">
                  <input
                    type="search"
                    placeholder="Search Product..."
                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                    value={search}
                    onChange={handleSearchData}
                  />
                  {searchData && searchData.length !== 0 ? (
                    <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                      {searchData &&
                        searchData.map((i, index) => {
                          const d = i.name;
                          const productName = d.replace(/\s+/g, "-"); //to remove space
                          return (
                            <div key={index}>
                              <Link
                                to={`/product/${productName}`}
                                onClick={() => setOpenMenu(false)}
                              >
                                <div className="w-full flex items-start py-3">
                                  <img
                                    src={i?.image_Url[0]?.url}
                                    alt=""
                                    className="w-[40px] h-[40px] mr-[10px]"
                                  />
                                  <h1>{i.name}</h1>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  ) : null}
                </div>
                <Navbar />
                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                  <Link to={"/shop-create"}>
                    <h1 className="flex items-center text-white">
                      Become seller <IoIosArrowForward className="mr-1" />
                    </h1>
                  </Link>
                </div>
                <br />
                <br />
                <br />
                <div className="flex justify-center w-full">
                  {isAuthenticated ? (
                    <div className="">
                      <Link to={"/profile"}>
                        <img
                          src={`${backend}${user?.avatar}`}
                          alt=""
                          className="w-[100px] h-[100px] rounded-full border-[4px] border-[#4ae9d1]"
                        />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        to={"/login"}
                        className="text-[18px] pr-[10px] text-[#0000008a]"
                      >
                        Login/
                      </Link>
                      <Link
                        to={"/register"}
                        className="text-[18px] text-[#0000008a]"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
