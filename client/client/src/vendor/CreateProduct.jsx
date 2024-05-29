/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../Static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../redux/actions/productActions";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { error, success } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully");
      navigate("/shop/dashboard");
      window.location.reload();
    }
  }, [error, dispatch, success]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setImage((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    image.forEach((image) => {
      newForm.append("image", image);
    });
    newForm.append("name", name);
    newForm.append("tags", tags);
    newForm.append("category", category);
    newForm.append("description", description);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    dispatch(createProduct(newForm));
  };
  return (
    <React.Fragment>
      <div className=" bg-white w-[90%] 800px:w-[50%] shadow-sm h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <h5 className=" text-center font-Poppins text-[30px]">
          Create Product
        </h5>
        <form onSubmit={handleSubmit}>
          <br />
          <div className="">
            <label htmlFor="name" className="pb-2">
              Name <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product name..."
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="category" className="pb-2">
              Category <span className=" text-red-500">*</span>
            </label>
            <select
              name="category"
              id="category"
              className=" w-full mt-2 border h-[35px] rounded-[5px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="choose a category">choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div className="">
            <label htmlFor="tags" className="pb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              id="tags"
              onChange={(e) => setTags(e.target.value)}
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product tag..."
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="price" className="pb-2">
              Original Price <span className=" text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={originalPrice}
              id="price"
              required
              onChange={(e) => setOriginalPrice(e.target.value)}
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product price..."
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="dprice" className="pb-2">
              Discount Price <span className=" text-red-500">*</span>
            </label>
            <input
              type="number"
              name="dprice"
              value={discountPrice}
              id="dprice"
              required
              onChange={(e) => setDiscountPrice(e.target.value)}
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product discount price..."
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="stock" className="pb-2">
              Product Stock <span className=" text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={stock}
              id="stock"
              required
              onChange={(e) => setStock(e.target.value)}
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product stock..."
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="description" className="pb-2">
              Description <span className=" text-red-500">*</span>
            </label>
            <textarea
              cols={30}
              rows={8}
              type="text"
              name="description"
              value={description}
              id="description"
              required
              onChange={(e) => setDescription(e.target.value)}
              className=" mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product description..."
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="image" className="pb-2">
              Upload images <span className=" text-red-500">*</span>
            </label>
            <input
              type="file"
              name="image"
              id="upload"
              className=" hidden"
              multiple
              onChange={handleImageChange}
            />
            <div className="flex items-center flex-wrap w-full">
              <label htmlFor="upload">
                <AiOutlinePlusCircle
                  size={30}
                  className="mt-3 cursor-pointer"
                  color="#555"
                />
              </label>

              {image &&
                image.map((i) => (
                  <img
                    src={URL.createObjectURL(i)}
                    key={i}
                    alt=""
                    className=" h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
          </div>
          <br />
          <div className="">
            <input
              type="submit"
              value="Create"
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateProduct;
