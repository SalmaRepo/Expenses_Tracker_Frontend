import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <ul className="footerUL">
        {/* left */}
        <div className="ulLeft">
          <li>
            <a
              className="eachPerson"
              href="https://github.com/BarbaraPapa"
              target="_blank"
            >
              <img
                className="gitHubLogo"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Barbara Papa
            </a>
          </li>
          <li>
            <a
              className="eachPerson"
              href="https://github.com/SalmaRepo"
              target="_blank"
            >
              <img
                className="gitHubLogo  mobile"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Salma Sheik
            </a>
          </li>
        </div>

        {/* logo */}
        <li>
          <a href="">
            <img
              className="logoFooter"
              src="images/LOGO.png"
              alt="logo of the project"
            />
          </a>
        </li>

        {/* right */}
        <div className="ulRight">
          <li>
            <a
              className="eachPerson"
              href="https://github.com/LLDieg"
              target="_blank"
            >
              <img
                className="gitHubLogo"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Diego LLerena
            </a>
          </li>
          <li>
            <a
              className="eachPerson"
              href="https://github.com/ThulasiSushma"
              target="_blank"
            >
              <img
                className="gitHubLogo  mobile"
                src="images/GitHub.png"
                alt="GitHub logo"
              />
              Thulasi Sushma
            </a>
          </li>
        </div>
      </ul>
    </footer>
  );
}

export default Footer;
