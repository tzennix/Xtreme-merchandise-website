document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const page = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    }
  });
});

function changeProduct(imgId, imgName, btn) {
  document.getElementById(imgId).src = "images/" + imgName;

  const buttons = btn.parentElement.querySelectorAll(".color");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
