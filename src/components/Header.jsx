/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { IoMenu } from "react-icons/io5";
import { FaUser, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import useLogout from "../hooks/useLogut";
import { useState, useRef } from "react";
import Logo from "../assets/Kuro-Neko.png";
import { FaRegBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
export function Header({ setInputValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const [userMenu, setUserMenu] = useState();
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      nav(`/search?q=${search}`);
      setSearch('')
      setOpenSearch(false)
      searchRef.current.value = ''
    }
  };
  const openSearchHandle = () => {
    if (searchRef.current) {
      searchRef.current.focus();
      setOpenSearch((prev) => !prev);
    }
  };
  return (
    <div className="w-max-full w-full  px-8 h-16 bg-[#152232] sticky -top-1 z-40">
      <div className="flex mx-6 justify-between items-center h-full">
        <Link to="/" className=" w-28 scale-150">
         <h1 className="font-bold">TekajeOne</h1>
        </Link>{" "}
        <div>
          <div className="flex items-center gap-4">
            {openSearch ? (
              <RxCross2
                size="22"
                onClick={() => {
                  setOpenSearch(false);
                }}
              />
            ) : (
              <FaSearch
                size="22"
                onClick={() => {
                  setOpenSearch(true);
                }}
              />
            )}
            <div>
              <Link to={'/bookmarks'}>
                <FaRegBookmark size={22} />
              </Link>
            </div>
          </div>
          <div
            className={`left-0 focus w-full absolute top-16 flex justify-center items-center pb-3 bg-[#152232] ${
              openSearch ? "" : "hidden"
            }`}
          >
            <input
              type="text"
              className="w-11/12 input-bordered relative mx-auto h-10 rounded border-white border bg-[rgb(83,83,84)] p-5"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              ref={searchRef}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute right-[2rem] md:right-[3rem] lg:right-[3.5rem] w-6 flex flex-row-reverse">
              <Link to={`/search?q=${search}`}>
                <FaSearch size="24" className="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
