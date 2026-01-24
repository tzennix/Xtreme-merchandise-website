/* =========================
   NAVBAR ACTIVE LINK
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const page = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    }
  });

  loadCart();
});

/* =========================
   PRODUCT COLOR SWITCH
========================= */
function changeProduct(imgId, imgName, btn) {
  document.getElementById(imgId).src = "images/" + imgName;

  const buttons = btn.parentElement.querySelectorAll(".color");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

/* =========================
   GET SELECTED COLOR (FIX)
========================= */
function getSelectedColor(button) {
  const card = button.closest(".product-card");
  const activeColor = card.querySelector(".color.active");
  return activeColor ? activeColor.classList[1] : "black";
}

/* =========================
   CART LOGIC
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image, color) {
  cart.push({ name, price, image, color });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart");
}

function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img" alt="${item.name}">

        <div class="cart-details">
          <p class="cart-title">${item.name}</p>
          <p>₹${item.price}</p>

          <div class="cart-color">
            Color:
            <span class="color-dot ${item.color}"></span>
            <span class="color-name">${item.color}</span>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  cartTotal.innerText = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* =========================
   CHECKOUT + ORDERS
========================= */
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  orders.push({
    items: cart,
    total: total,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  cart = [];
  alert("Order placed successfully!");
  loadCart();
}
/* =========================
   LOGO SPATIAL HOVER EFFECT
========================= */
const logo = document.querySelector(".logo-tilt");

if (logo) {
  logo.addEventListener("mousemove", (e) => {
    const rect = logo.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;

    logo.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! We’ll get back to you soon.");
    contactForm.reset();
  });
}
/* =========================
   DARK MODE TOGGLE
========================= */
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
});
