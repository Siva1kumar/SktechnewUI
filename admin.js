const API_URL =
"https://script.google.com/macros/s/AKfycbwxpMoYA7gmul9iMk9eA2Cae07sxynCp6Ff73BhXFAdJoOMBmNzZP2-5ck2qRyqjm7W/exec";

document.addEventListener(
  "DOMContentLoaded",
  loadAdminDashboard
);

async function loadAdminDashboard() {

  if (
    localStorage.getItem("userRole")
    !== "admin"
  ) {
    window.location.href =
      "login.html";
    return;
  }

  document.getElementById(
    "adminName"
  ).innerText =
    localStorage.getItem("name");

  document.getElementById(
    "adminEmail"
  ).innerText =
    localStorage.getItem("email");

  loadInterviews();
}

async function loadInterviews() {

  const response =
    await fetch(API_URL);

  const data =
    await response.json();

  let booked = 0;
  let available = 0;

  const body =
    document.getElementById(
      "adminBody"
    );

  body.innerHTML = "";

  data.forEach(row => {

    const regId =
      row["Sk Tech Register ID"];

    if (regId)
      booked++;
    else
      available++;

    body.innerHTML += `
      <tr>
      <td>${regId}</td>
      <td>${row["Full Name"]}</td>
      <td>${row[" Technologies Required"]}</td>
      <td>${row["Interview Date"]}</td>
      <td>
      ${row["Interview Time (From)  or  If Time Not confirmed plz select 00:00 like Assessment"]}
      -
      ${row["Interview Time (To) or  If Time Not confirmed plz select 00:00 like Assessment"]}
      </td>
      </tr>
    `;
  });

  document.getElementById(
    "bookedCountAdmin"
  ).innerText = booked;

  document.getElementById(
    "availableCountAdmin"
  ).innerText = available;

  document.getElementById(
    "upcomingCountAdmin"
  ).innerText = data.length;
}

function logout() {

  auth.signOut();

  localStorage.clear();

  window.location.href =
    "login.html";
}
