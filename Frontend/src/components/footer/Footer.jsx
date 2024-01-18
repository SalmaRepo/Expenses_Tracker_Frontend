import React from "react";
import "./footer.css";

function Footer() {
  return (
    <ul className="footerUL">
      <div className="ulLeft">
          <li>
        {" "}
        <a
          className="eachPerson"
          href="https://github.com/BarbaraPapa"
          target="_blank"
        >
          {" "}
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="" />{" "}
          Barbara Papa
        </a>
      </li>
      <li>
        {" "}
        <a
          className="eachPerson"
          href="https://github.com/SalmaRepo"
          target="_blank"
        >
          {" "}
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="" />{" "}
          Salma Sheik
        </a>
      </li>
      </div>
      <li>
        {" "}
        {/* <div className="imageHolder"> */}
          {" "}
          <a href="" target="_blank">
            {" "}
            <img
              className="logoFooter"
              src="images/logoWhite.png"
              alt="logo of the project"
            />{" "}
          </a>
          {/* <div className="thanks"> Thanks for Ordering</div> */}
        {/* </div> */}
      </li>
      <div className="ulRight">
      <li>
        {" "}
        <a
          className="eachPerson"
          href="https://github.com/LLDieg"
          target="_blank"
        >
          {" "}
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="" />{" "}
          Diego LLerena
        </a>
      </li>
      <li>
        {" "}
        <a
          className="eachPerson"
          href="https://github.com/ThulasiSushma"
          target="_blank"
        >
          {" "}
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="" />{" "}
          Thulasi Sushma{" "}
        </a>
      </li>
      </div>
    </ul>
  );
}

export default Footer;
