import React, { useContext } from "react";
import "./about.css";
import LineChart from "../graph/lineChart";
import LandNavBar from "../landingNavBar/LandNavBar";
import { context } from "../../context/context";

export default function About() {
  const { state, dispatch } = useContext(context);
  return (
    <div className="about-container">
      {state.isOnSignAndLogin && <LandNavBar />}

      <section className="headline"></section>

      {!state.isOnSignAndLogin && (
        <main className="cards-container">
          {/* Card-1 */}
          <div className="card">
            <h2>Track your expenses and incomes</h2>
            <img
              className="imgOne"
              src="images/img-card1.jpg"
              alt="holding money"
            />
            <p>
              You can track and manage your expenses with ease using our expense
              tracking app.
            </p>
          </div>

          {/* Card-2 */}
          <div className="card">
            <h2>Track expenses with graphs</h2>
            <LineChart />
            <p>
              Visualize your income over time with interactive graphs and charts
              for better financial insights.
            </p>
          </div>

          {/* Card-3 */}
          <div className="card">
            <h2>Weekly, monthly or yearly history</h2>
            <img className="imgOne" src="images/img-card3.jpg" alt="graph" />
            <p>
              Explore your financial history with weekly and monthly reports,
              helping you plan for the future.
            </p>
          </div>
        </main>
      )}

      <div id="about" className="about-app">
        <h1 className="about-app-title">
          Lorem ipsum dolor sit amet consectetur{" "}
        </h1>
        <p className="about-app-p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, fuga
          ipsum. Accusamus fuga autem temporibus facere quas porro, modi
          ducimus, cupiditate sequi veritatis sint eligendi tempore aliquam
          voluptates est repellat libero asperiores vero eos atque praesentium.
          Reprehenderit aliquam necessitatibus quasi sint voluptatem autem
          adipisci dignissimos alias laudantium, quas eum ullam!
        </p>
        <p className="about-app-p">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam dolorem
          labore id culpa excepturi magni quibusdam quia vel aliquam saepe
          molestiae dicta suscipit provident tempore, quis, ipsa inventore est a
          illum. Officia modi esse iste a cum! Quo voluptatem tenetur eveniet
          quibusdam, id excepturi, ratione dolorum nam ut quae ex!
        </p>
      </div>
    </div>
  );
}
