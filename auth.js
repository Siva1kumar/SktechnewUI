document.addEventListener("DOMContentLoaded", () => {

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const role = localStorage.getItem("userRole");

      if (role === "admin") {
        window.location.href = "admin.html";
      }

      if (role === "candidate") {
        window.location.href = "candidate.html";
      }
    }
  });

  document
    .getElementById("loginBtn")
    ?.addEventListener("click", handleLogin);
});

async function handleLogin() {

  const username = document
    .getElementById("username")
    .value
    .trim();

  const password = document
    .getElementById("password")
    .value
    .trim();

  try {

    let email = username;

    if (!username.includes("@")) {
      email = `${username}@mysktech.com`;
    }

    const result =
      await auth.signInWithEmailAndPassword(
        email,
        password
      );

    const users =
      await db.collection("users")
      .where("Email", "==", email)
      .get();

    users.forEach(doc => {

      const data = doc.data();

      localStorage.setItem(
        "userRole",
        data.role
      );

      localStorage.setItem(
        "registerId",
        doc.id
      );

      localStorage.setItem(
        "name",
        data.Name || ""
      );

      localStorage.setItem(
        "technology",
        data.Technology || ""
      );

      localStorage.setItem(
        "email",
        email
      );

      if (data.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "candidate.html";
      }
    });

  } catch (err) {
    alert(err.message);
  }
}