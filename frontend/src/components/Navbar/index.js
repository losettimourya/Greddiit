
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import styles from "../Main/styles.module.css"
const handlelogout = () => {
  localStorage.removeItem("token")
   window.location.reload()
}

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
        <NavLink to='/dashboard' activeStyle>
            Dashboard
            <img src="https://source.unsplash.com/random" alt="Random Image" width="20" height="20"></img>
          </NavLink>
          <NavLink to='/home' activeStyle>
            Profile
            <img src="https://source.unsplash.com/random" alt="Random Image" width="20" height="20"></img>
          </NavLink>
          <NavLink to="/subgreddiit" activeStyle>
            My Subgreddiits
            <img src="https://source.unsplash.com/random" alt="Random Image" width="20" height="20"></img>
          </NavLink>
          <NavLink to="/allsubgreddiit" activeStyle>
            Subgreddiits
            <img src="https://source.unsplash.com/random" alt="Random Image" width="20" height="20"></img>
          </NavLink>
          <NavLink to="/savedposts" activeStyle>
            SavedPosts
            <img src="https://source.unsplash.com/random" alt="Random Image" width="20" height="20"></img>
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/" onClick={handlelogout}>Logout</NavBtnLink>
        </NavBtn>
      </Nav>
      <nav className={styles.navbar}>
					<h1>GREDDIIT</h1>
				</nav>
    </>
  );
};
  
export default Navbar;