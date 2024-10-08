import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks";

export default function Navbar() {
  const {toggleTheme} = useTheme()


  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="max-w-screen-xl mx-auto p-2">
          <div className="flex justify-between items-center">
            {/* <img src="./logo.png" alt="" className="h-10" /> */}
            <Link to="/">
              <MdOutlineLocalMovies color="#fff" size="2em" />
            </Link>
            <ul className="flex items-center space-x-4">
              <li>
                <button onClick={toggleTheme} className="bg-dark-subtle p-1 rounded">
                  <BsFillSunFill className="text-secondary" size={24} />
                </button>
              </li>
              <li>
                <input
                  type="text"
                  className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                  placeholder="search..."
                />
              </li>
              <Link to="/auth/signin">
                <li className="text-white font-semibold text-lg">Login</li>
              </Link>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}