/* eslint-disable react/prop-types */
import axios from "axios";
import React from "react";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { IoReceiptOutline } from "react-icons/io5";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { TbAddressBook } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { backend } from "../../../server";
import { toast } from "react-toastify";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    axios
      .get(`${backend}api/v2/user/logout`)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.respose.data.message);
      });
  };
  return (
    <React.Fragment>
      <div className="w-full rounded-[10px] bg-white shadow-sm p-4 pt-8">
        <div
          onClick={() => setActive(1)}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <RxPerson size={20} color={active === 1 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 1 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Profile
          </span>
        </div>
        <div
          onClick={() => setActive(2)}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <FiShoppingBag size={20} color={active === 2 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 2 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Orders
          </span>
        </div>
        <div
          onClick={() => setActive(3)}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <IoReceiptOutline size={20} color={active === 3 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            }800px:block hidden`}
          >
            Refunds
          </span>
        </div>
        <div
          onClick={() => setActive(4) || navigate("/inbox")}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 4 ? "text-[red]" : ""
            }800px:block hidden`}
          >
            Inbox
          </span>
        </div>
        <div
          onClick={() => setActive(5)}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 5 ? "text-[red]" : ""
            }800px:block hidden`}
          >
            Track Orders
          </span>
        </div>
        <div
          onClick={() => setActive(6)}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 6 ? "text-[red]" : ""
            }800px:block hidden`}
          >
            Change Password
          </span>
        </div>
        <div
          onClick={() => setActive(7)}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 7 ? "text-[red]" : ""
            }800px:block hidden`}
          >
            Address
          </span>
        </div>
        <div
          onClick={() => setActive(8) || logoutHandler()}
          className="flex items-center w-full mb-8 cursor-pointer"
        >
          <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === 8 ? "text-[red]" : ""
            }800px:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileSidebar;
