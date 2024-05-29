/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend } from "../../../server";

const MessageLists = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  sellerId,
  online,
  setActiveStatus,
  setUserData,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };
  useEffect(() => {
    const userId = data.members.find((user) => user !== sellerId);
    const getUser = async () => {
      try {
        const res = await axios.get(`/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [data, online, sellerId, setActiveStatus, setUser]);

  return (
    <React.Fragment>
      <div
        className={`flex w-full p-2 px-3 ${
          active === index ? "bg-[#00000018]" : "bg-transparent"
        }  cursor-pointer`}
        onClick={() =>
          setActive(index) ||
          setCurrentChat(data) ||
          setUserData(user) ||
          handleClick(data._id) ||
          setActiveStatus(online)
        }
      >
        <div className="relative">
          <img
            src={`${backend}/${user?.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          {online ? (
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
          ) : (
            <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
          )}
        </div>
        <div className="pl-3">
          <h1 className="text-[18px] capitalize">{user?.name}</h1>
          <p className="text-[14px] text-[#000c]">
            {data?.lastMessageId !== user?._id ? "You:" : user?.name}
            {data?.lastMessage}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessageLists;
