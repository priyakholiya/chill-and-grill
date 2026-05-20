/* --------------------------------------------------
   Chill & Grill - Interactive Client Logic Script
   -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. LIGHT / DARK THEME TOGGLE WITH LOCAL STORAGE
  // ==========================================
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const currentTheme = localStorage.getItem("theme") || "dark";
  
  // Set initial theme state
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "light") {
      themeToggleBtn.className = "fa-solid fa-sun";
      themeToggleBtn.title = "Switch to Dark Theme";
    } else {
      themeToggleBtn.className = "fa-solid fa-moon";
      themeToggleBtn.title = "Switch to Light Theme";
    }
  }

  // ==========================================
  // 2. MOBILE RESPONSIVE HAMBURGER NAVIGATION
  // ==========================================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuBtn.classList.toggle("fa-xmark");
  });

  // Close menu when clicking on any navigational link
  document.querySelectorAll("#navMenu li a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenuBtn.className = "fa-solid fa-bars";
    });
  });

  // ==========================================
  // 3. HEART WISH-LIST INTERACTIVE STATE
  // ==========================================
  const wishlistIcon = document.getElementById("wishlistIconBtn");
  if (wishlistIcon) {
    wishlistIcon.addEventListener("click", () => {
      wishlistIcon.classList.toggle("fa-solid");
      wishlistIcon.classList.toggle("fa-regular");
      
      if (wishlistIcon.classList.contains("fa-solid")) {
        wishlistIcon.style.color = "var(--accent-secondary)";
      } else {
        wishlistIcon.style.color = "";
      }
    });
  }

  // ==========================================
  // 4. PHOTO LIGHTBOX VIEWER FOR GALLERY
  // ==========================================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-box").forEach(box => {
    box.addEventListener("click", () => {
      const img = box.querySelector("img");
      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt || "Gourmet Dish";
        lightbox.style.display = "flex";
      }
    });
  });

  // Close Lightbox triggers
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    lightboxCaption.textContent = "";
  }

  // ==========================================
  // 5. INTERACTIVE SHOPPING CART SYSTEM
  // ==========================================
  let cart = [];
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartIconBtn = document.getElementById("cartIconBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");

  // Drawer Open/Close event listeners
  cartIconBtn.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);
  cartOverlay.addEventListener("click", toggleCart);

  function toggleCart() {
    cartDrawer.classList.toggle("active");
    cartOverlay.classList.toggle("active");
  }

  // Dynamic Price changes on card dropdown selection
  document.querySelectorAll(".food-choice").forEach(select => {
    select.addEventListener("change", function () {
      const card = this.closest(".menu-card");
      const priceDisplay = card.querySelector(".menu-price-display");
      const selectedOption = this.options[this.selectedIndex];
      const price = parseFloat(selectedOption.getAttribute("data-price"));
      
      // Get base price from the first option with a valid price
      const firstValidOption = this.options[1];
      const basePrice = firstValidOption ? parseFloat(firstValidOption.getAttribute("data-price")) : 0;

      if (price > 0) {
        priceDisplay.textContent = `$${price.toFixed(2)}`;
      } else {
        priceDisplay.textContent = `From $${basePrice.toFixed(2)}`;
      }
    });
  });

  // Add Item to Cart click triggers
  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const card = this.closest(".menu-card");
      const select = card.querySelector(".food-choice");
      const category = card.querySelector("h3").textContent;
      
      const selectedOption = select.options[select.selectedIndex];
      const variantName = selectedOption.value;
      const price = parseFloat(selectedOption.getAttribute("data-price"));

      if (!variantName || price === 0) {
        alert("Please choose a variant option from the dropdown menu first.");
        return;
      }

      addItemToCart(category, variantName, price);
      
      // Reset dropdown selection
      select.value = "";
      const priceDisplay = card.querySelector(".menu-price-display");
      const firstValidOption = select.options[1];
      const basePrice = firstValidOption ? parseFloat(firstValidOption.getAttribute("data-price")) : 0;
      priceDisplay.textContent = `From $${basePrice.toFixed(2)}`;
    });
  });

  function addItemToCart(category, variant, price) {
    const existingIndex = cart.findIndex(item => item.category === category && item.variant === variant);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ category, variant, price, quantity: 1 });
    }

    renderCartUI();
    
    // Highlight the cart icon to show feedback
    cartIconBtn.style.transform = "scale(1.2)";
    setTimeout(() => cartIconBtn.style.transform = "", 200);
  }

  function removeItemFromCart(index) {
    cart.splice(index, 1);
    renderCartUI();
  }

  function renderCartUI() {
    const container = document.getElementById("cartItemsContainer");
    const totalDisplay = document.getElementById("cartTotalValue");
    const badge = document.getElementById("cartBadgeCount");
    
    // Auto fill target input elements in checkout form
    const foodInput = document.getElementById("food");
    const qtyInput = document.getElementById("quantity");

    container.innerHTML = "";
    
    if (cart.length === 0) {
      container.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
      totalDisplay.textContent = "$0.00";
      badge.textContent = "0";
      badge.style.display = "none";
      if (foodInput) foodInput.value = "";
      if (qtyInput) qtyInput.value = "";
      return;
    }

    let subtotal = 0;
    let totalQty = 0;
    let descList = [];

    cart.forEach((item, index) => {
      subtotal += item.price * item.quantity;
      totalQty += item.quantity;
      descList.push(`${item.category} (${item.variant}) x${item.quantity}`);

      const itemCard = document.createElement("div");
      itemCard.className = "cart-item";
      itemCard.innerHTML = `
        <div class="cart-item-details">
          <div class="cart-item-name">${item.category} - ${item.variant}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} &times; ${item.quantity}</div>
        </div>
        <button class="cart-item-remove-btn" data-index="${index}" title="Remove Item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;
      container.appendChild(itemCard);
    });

    // Update UI elements
    badge.textContent = totalQty;
    badge.style.display = "flex";
    totalDisplay.textContent = `$${subtotal.toFixed(2)}`;

    // Sync elements inside Form
    if (foodInput) foodInput.value = descList.join(", ");
    if (qtyInput) qtyInput.value = totalQty;

    // Attach Remove Button events
    document.querySelectorAll(".cart-item-remove-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        const index = parseInt(this.getAttribute("data-index"));
        removeItemFromCart(index);
      });
    });
  }

  // ==========================================
  // 6. CHECKOUT BUTTON & SCROLL TO FORM
  // ==========================================
  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please select food items from the menu first.");
      return;
    }
    
    // Close Drawer
    toggleCart();
    
    // Smooth Scroll to Form
    document.getElementById("Order").scrollIntoView({ behavior: "smooth" });
  });

  // ==========================================
  // 7. MENU CARD SEARCH FILTER
  // ==========================================
  const searchIconBtn = document.getElementById("searchIconBtn");

  if (searchIconBtn) {
    searchIconBtn.addEventListener("click", () => {
      const term = prompt("Enter food category (Pizza, Burger, Dosa, Coffee, etc.)");
      if (!term || term.trim() === "") return;

      const titles = document.querySelectorAll(".menu-card h3");
      let found = false;

      titles.forEach(title => {
        if (title.textContent.toLowerCase().includes(term.trim().toLowerCase())) {
          const card = title.closest(".menu-card");
          
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          found = true;

          // Temporary premium highlight animation via inline style manipulation
          setTimeout(() => {
            card.style.borderColor = "var(--accent-color)";
            card.style.boxShadow = "var(--shadow-glow)";
            card.style.transform = "scale(1.05)";
          }, 400);

          setTimeout(() => {
            card.style.borderColor = "";
            card.style.boxShadow = "";
            card.style.transform = "";
          }, 2400);
        }
      });

      if (!found) {
        alert("Sorry, we couldn't find any dishes matching that term.");
      }
    });
  }

  // ==========================================
  // 8. ORDER FORM CLIENT VALIDATION & PLACEMENT
  // ==========================================
  const checkoutForm = document.getElementById("checkoutForm");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = checkoutForm.name.value.trim();
      const email = checkoutForm.email.value.trim();
      const phone = checkoutForm.phone.value.trim();
      const food = checkoutForm.food.value.trim();
      const qty = checkoutForm.quantity.value.trim();
      const address = checkoutForm.address.value.trim();

      // Form validation
      if (!name || !email || !phone || !food || !qty || !address) {
        alert("Please make sure all form fields are filled.");
        return;
      }

      if (phone.length < 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      // Successful order feedback
      alert(`Thank you, ${name}! Your order has been placed successfully. ✅\n\nItems: ${food}\nTotal Items: ${qty}\nDelivery Address: ${address}`);
      
      // Reset form and empty the shopping cart
      checkoutForm.reset();
      cart = [];
      renderCartUI();
    });
  }

});
