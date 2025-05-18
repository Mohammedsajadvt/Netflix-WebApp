import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

function NavBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full h-[60px] px-5 py-5 flex justify-between items-center z-[100] transition-colors duration-300 ${
        show ? "bg-[#111]" : "bg-transparent"
      }`}
    >
      <img
        className="fixed left-[50px] w-[80px]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="fixed right-[50px] w-[30px]"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
      />
      <Outlet />
    </div>
  );
}

export default NavBar;
