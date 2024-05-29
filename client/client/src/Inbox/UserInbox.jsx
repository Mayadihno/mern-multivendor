/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { FcGallery } from "react-icons/fc";
import { format } from "timeago.js";
import { backend } from "../../../server";
import styles from "../styles/styles";

const UserInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
}) => {
  return (
    <React.Fragment>
      <div className=" w-full min-h-[86vh] flex flex-col justify-between">
        {/* message header */}
        <div className=" w-full flex p-3 items-center justify-between bg-slate-300">
          <div className="flex">
            <img
              src={`${backend}/${userData?.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600] capitalize">
                {userData?.shopName}
              </h1>
              <h1>{activeStatus ? "Active now" : ""}</h1>
            </div>
          </div>
          <AiOutlineArrowRight
            className=" cursor-pointer"
            size={20}
            onClick={() => setOpen(false)}
          />
        </div>

        {/* messages */}
        <div className="px-3 overflow-y-scroll h-[65vh] py-3">
          {messages &&
            messages.map((item, index) => (
              <div
                key={index}
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender !== sellerId && (
                  <img
                    src="http://localhost:8000/painting-baby-wearing-blue-hoodie-1706210137440-482481482.png"
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                <div className="">
                  <div className=" w-max p-2 rounded h-min bg-slate-400 text-white ml-2">
                    <p>{item.text}</p>
                  </div>
                  <p className="text-[12px] text-[#00000074] ml-4 pt-1">
                    {format(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* send message input */}
        <form
          aria-required={true}
          className="p-3 relative flex justify-between items-center"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[3%] cursor-pointer mr-2">
            <FcGallery size={25} />
          </div>
          <div className="w-[97%]">
            <input
              type="text"
              placeholder="enter your message"
              className={`${styles.input}`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <input type="submit" value={"send"} id="send" className="hidden" />
            <label
              htmlFor="send"
              className=" absolute right-4 top-4 cursor-pointer"
            >
              <AiOutlineSend size={25} />
            </label>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UserInbox;
