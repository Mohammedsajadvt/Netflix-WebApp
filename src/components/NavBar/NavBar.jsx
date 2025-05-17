import React, { useEffect, useState } from 'react'
import "./NavBar.css"
function NavBar() {
 const [show,setShow] =useState(false);
 useEffect(()=>{
  const handleScroll = () =>{
    setShow(window.scrollY>50);
  }
  window.addEventListener("scroll",handleScroll);
  return ()=> window.removeEventListener("scroll",handleScroll);
 },[]);
  return (
    <div className={`navbar ${show ? "scrolled":""}`}>
     <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo"/>
     <img className='avatar' src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar"/>
    </div>
  )
}

export default NavBar