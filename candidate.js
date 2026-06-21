const API_URL =
"https://script.google.com/macros/s/XXXXXXXX/exec";

document.addEventListener(
  "DOMContentLoaded",
  loadCandidateDashboard
);

async function loadCandidateDashboard() {

  if (
    localStorage.getItem("userRole")
    !== "candidate"
  ) {
    window.location.href =
      "login.html";
    return;
  }

  document.getElementById(
    "candidateName"
  ).innerText =
    localStorage.getItem("name");

  document.getElementById(
    "candidateReg"
  ).innerText =
    localStorage.getItem("registerId");

  document.getElementById(
    "candidateTech"
  ).innerText =
    localStorage.getItem("technology");

  document.getElementById(
    "candidateEmail"
  ).innerText =
    localStorage.getItem("email");

  loadSlots();
}

async function loadSlots() {

  const response =
    await fetch(API_URL);

  const data =
    await response.json();

  let booked = 0;
  let available = 0;

  const bookedBody =
    document.getElementById(
      "bookedBody"
    );

  const availableBody =
    document.getElementById(
      "availableBody"
    );

  bookedBody.innerHTML = "";
  availableBody.innerHTML = "";

  data.forEach(row => {

    const regId =
      row["Sk Tech Register ID"];

    const html = `
      <tr>
      <td>${regId || "Available"}</td>
      <td>${row[" Technologies Required"]}</td>
      <td>${row["Interview Date"]}</td>
      <td>
      ${row["Interview Time (From)  or  If Time Not confirmed plz select 00:00 like Assessment"]}
      -
      ${row["Interview Time (To) or  If Time Not confirmed plz select 00:00 like Assessment"]}
      </td>
      </tr>
    `;

    if (regId) {
      booked++;
      bookedBody.innerHTML += html;
    } else {
      available++;
      availableBody.innerHTML += html;
    }
  });

  document.getElementById(
    "availableCount"
  ).innerText = available;

  document.getElementById(
    "bookedCount"
  ).innerText = booked;
}

function logout() {

  auth.signOut();

  localStorage.clear();

  window.location.href =
    "login.html";
}