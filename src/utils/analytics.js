// src/utils/analytics.js
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-MV4K311TZE"; // bu yerga o‘zingni ID ni yoz

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logPageView = (path = window.location.pathname) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
