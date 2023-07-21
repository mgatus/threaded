//slider
(function(){
  const slides = document.querySelectorAll(".slide");
  const pagination = document.querySelector(".pagination");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  // Create pagination dots
  function createDots() {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.addEventListener("click", () => goToSlide(i));
      pagination.appendChild(dot);
    }
    updateDots();
  }

  // Update active dot
  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    const slideWidth = slides[0].clientWidth;
    const offset = -slideWidth * currentIndex;
    document.querySelector(
      ".slides"
    ).style.transform = `translateX(${offset}px)`;
    updateDots();
  }

  // Go to the previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  // Go to the next slide
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  createDots();
}());


(function() {
  let navbar = document.getElementById("header");
  let banner = document.getElementById("banner")
  let sticky = navbar.offsetTop + 20;

  function fixedNav() {
    if (window.scrollY >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", fixedNav);

}());


//Alpine js
function cartComponent() {
  const CART_KEY = "cartItems";
  return {
    cart: [],
    open: false,
    numberCount: false,
    checkout: false,
    addToCart(id, title, price, discount, img) {
      const existingItem = this.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({
          id: id,
          title: title,
          price: discount !== "0" ? discount : price,
          img: img,
          quantity: 1,
        });
      }
      this.numberCounter();
      this.saveCart();
    },
    calculateTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    loadCart() {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
      }
      this.numberCounter();
    },
    saveCart() {
      this.numberCount = true;
      localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
      this.numberCounter();
    },
    totalObject() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.quantity;
      });
      return total;
    },
    increaseQuantity(index) {
      this.cart[index].quantity++;
      this.saveCart();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      }
      this.saveCart();
    },
    removeFromCart(index) {
      this.numberCount = false;
      this.cart.splice(index, 1);
      this.saveCart();
      this.numberCounter();
    },
    showBasket() {
      if(this.totalObject() === 0) {
        this.open = false;
      } else {
        this.open = !this.open;
      }
    },
    numberCounter() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.quantity;
      });

      if (total === 0) {
        this.open = false;
        this.numberCount = false;
      } else {
        this.numberCount = true;
      }
    },
    showCheckout() {
      this.checkout = ! this.checkout;
      this.open = false;
    }
  };
}




  
