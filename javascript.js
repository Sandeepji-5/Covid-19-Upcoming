"use strict";

// Select HTML elements
const casesId = document.getElementById("data");
const recoveredId = document.getElementById("recovered");
const deathsId = document.getElementById("deaths");

// Disease.sh API (global historical data)
const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";

// Function to fetch and show latest COVID data
const fetchCovidData = async function () {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch COVID data.");

    const data = await response.json();

    // Get the last date from the time series
    const dates = Object.keys(data.cases);
    const lastDate = dates[dates.length - 1];

    // Extract the latest values
    const totalCases = data.cases[lastDate] ?? "N/A";
    const totalRecovered = data.recovered[lastDate] ?? "N/A";
    const totalDeaths = data.deaths[lastDate] ?? "N/A";

    // Inject into HTML with commas
    casesId.innerHTML = totalCases.toLocaleString();
    recoveredId.innerHTML = totalRecovered.toLocaleString();
    deathsId.innerHTML = totalDeaths.toLocaleString();
  } catch (err) {
    console.error("Error loading COVID data:", err);
    casesId.innerHTML = "Unavailable";
    recoveredId.innerHTML = "Unavailable";
    deathsId.innerHTML = "Unavailable";
  }
};

// Fetch on load
fetchCovidData();

// Mobile navigation toggle
const hamburger = document.getElementById("hamburger");
const navUl = document.getElementById("nav-ul");

hamburger.addEventListener("click", () => {
  navUl.classList.toggle("show");
});
