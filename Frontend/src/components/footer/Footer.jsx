import React from "react";
import "./footer.css";

function Footer() {
  return (
    <ul className="footer">
      <li>
        <a
          className="eachPerson"
          href="https://github.com/BarbaraPapa"
          target="_blank"
        >
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="GitHub logo" />
          Barbara Papa
        </a>
      </li>
      <li>
        <a
          className="eachPerson"
          href="https://github.com/SalmaRepo"
          target="_blank"
        >
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="GitHub logo" />
          Salma Sheik
        </a>
      </li>
      <li>
        {/* Logo */}
        <div className="imageHolder">
          <a href="">
            <img
              className="logoFooter"
              src="images/logoWhite.png"
              alt="logo of the project"
            />
          </a>
        </div>
      </li>
      <li>
        <a
          className="eachPerson"
          href="https://github.com/LLDieg"
          target="_blank"
        >
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="GitHub logo" />
          Diego LLerena
        </a>
      </li>
      <li>
        <a
          className="eachPerson"
          href="https://github.com/ThulasiSushma"
          target="_blank"
        >
          <img className="gitHubLogo" src="images/gitHubLogo.png" alt="" />
          Thulasi Sushma
        </a>
      </li>
    </ul>
  );
}

export default Footer;
