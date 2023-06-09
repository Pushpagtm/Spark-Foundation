import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import "../styles/footer.css";
import { Link } from "react-router-dom";
function Footer(props) {
  return (
    <div>
      <footer>
       
        <div className="icons">
          <i>
            <AiFillGithub size={40} />
          </i>
          <i>
            <AiFillLinkedin size={40} />
          </i>
          <i>
            <AiFillInstagram size={40} />
          </i>
        </div>
        <div> &copy; {new Date().getFullYear()} Copyright:
      <Link href='#'>
        sparkbank.com
      </Link></div>
      </footer>
    </div>
  );
}

export default Footer;
