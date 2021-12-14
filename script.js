const sidebarNavContainer = document.querySelector(".sidebar-nav-container");
const sidebar = document.querySelector(".sidebar");
const hamburger = document.querySelector(".mobile-menu");
const closeSidebar = document.querySelector(".close-sidebar");
const desktopGalleryMainImg = document.querySelector(
  ".desktop-gallery-main-img"
);
const masterLightbox = document.querySelector(".master-lb-bg");
const lightboxClose = document.querySelector(".lb-close");
const lightboxImg = document.querySelector(".lb-img");
const thumbs = document.querySelectorAll(".thumb ");
const lbThumbs = document.querySelectorAll(".lb-thumb ");
const mobileImg = document.querySelector(".mobile-img");
const imgArrows = document.querySelectorAll(".icon-click");
const incDec = document.querySelectorAll(".inc-dec");
const qtyItem = document.querySelector(".qty-item");
const itemAmt = document.querySelector(".item-amt");
const addToCartBtn = document.querySelector(".btn-add-to-checkout");

const checkoutDropdown = document.querySelector(".checkout-dropdown");
const cartIconContainer = document.querySelector(".cart-icon-container");
const checkoutEmpty = document.querySelector(".checkout-empty");
const checkoutTotals = document.querySelector(".checkout-totals");
const checkoutTotal = document.querySelector(".checkout-total");
const checkoutQty = document.querySelector(".checkout-qty");
const deleteItems = document.querySelector(".delete-items");

const appState = {
  images: [
    {
      thumbnail: "/images/image-product-1-thumbnail.jpg",
      fullSize: "/images/image-product-1.jpg",
    },
    {
      thumbnail: "/images/image-product-2-thumbnail.jpg",
      fullSize: "/images/image-product-2.jpg",
    },
    {
      thumbnail: "/images/image-product-3-thumbnail.jpg",
      fullSize: "/images/image-product-3.jpg",
    },
    {
      thumbnail: "/images/image-product-3-thumbnail.jpg",
      fullSize: "/images/image-product-3.jpg",
    },
  ],
  counter: 0,
  cartcounter: 0,
  cartTotalPrice: 0,
  itemPrice: 125,
};

const calculateCartTotals = () => {
  let tempTotal = appState.cartcounter * appState.itemPrice;
  appState.cartTotalPrice = tempTotal;
};

const toggleCartDropdown = () => {
  if (appState.cartcounter === 0) {
    checkoutEmpty.style.display = "block";
    checkoutTotals.style.display = "none";
    checkoutDropdown.classList.toggle("open");
  } else {
    calculateCartTotals();
    displayDropDownWithTotal();
  }
};

const toggleSideBar = () => {
  sidebarNavContainer.classList.toggle("open");
  sidebar.classList.toggle("open");
};

const showLightBox = (e) => {
  lightboxImg.src = appState.images[appState.counter].fullSize;
  masterLightbox.classList.toggle("open");
};

const displayDropDownWithTotal = () => {
  checkoutTotal.textContent = `$${appState.cartTotalPrice}.00`;
  checkoutQty.textContent = appState.cartcounter;
  checkoutEmpty.style.display = "none";
  checkoutTotals.style.display = "grid";
  checkoutDropdown.classList.toggle("open");
};

const showEmptyAndRemove = () => {
  checkoutEmpty.style.display = "block";
  checkoutTotals.style.display = "none";
  checkoutDropdown.classList.toggle("open");
  setTimeout(() => {
    checkoutDropdown.classList.toggle("open");
  }, 2000);
  return;
};

const showCart = () => {
  if (appState.cartcounter === 0) {
    showEmptyAndRemove();
  } else {
    itemAmt.textContent = appState.cartcounter;
    itemAmt.style.display = "block";
  }
};

const changeActiveImg = (thumb, idx) => {
  desktopGalleryMainImg.src = appState.images[idx].fullSize;
};

const updateCartUI = () => {
  qtyItem.textContent = appState.cartcounter;
  if (appState.cartcounter === 0) {
    itemAmt.style.display = "none";
  }
};

const deleteCartItems = () => {
  appState.cartcounter = 0;
  appState.cartTotalPrice = 0;
  checkoutEmpty.style.display = "block";
  checkoutTotals.style.display = "none";
  itemAmt.style.display = "none";
  qtyItem.textContent = appState.cartcounter;
};

const addToCart = (e) => {
  const type = e.target.dataset.type;
  console.log(e.target.dataset.type);
  if (type === "dec" && appState.cartcounter === 0) {
    return;
  } else {
    if (type === "dec") {
      appState.cartcounter--;
    } else {
      appState.cartcounter++;
    }
  }
  updateCartUI();
};

const updateAllImages = () => {
  mobileImg.src = appState.images[appState.counter].fullSize;
  lightboxImg.src = appState.images[appState.counter].fullSize;
  changeActiveImg(desktopGalleryMainImg, appState.counter);

  thumbs.forEach((single) => {
    single.classList.remove("active");
  });

  lbThumbs.forEach((lbthumb) => {
    lbthumb.classList.remove("active");
  });

  thumbs[appState.counter].classList.add("active");
  lbThumbs[appState.counter].classList.add("active");
};

thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", (e) => {
    appState.counter = i;
    updateAllImages();
  });
});

lbThumbs.forEach((lbthumb, i) => {
  lbthumb.addEventListener("click", (e) => {
    appState.counter = i;
    updateAllImages();
  });
});

imgArrows.forEach((arrow, i) => {
  arrow.addEventListener("click", (e) => {
    console.log(e.target.dataset.control);
    e.stopPropagation();
    if (e.target.dataset.control === "next") {
      if (appState.counter === 3) {
        appState.counter = 0;
      } else {
        appState.counter++;
      }
    } else if (e.target.dataset.control === "prev") {
      if (appState.counter === 0) {
        appState.counter = 3;
      } else {
        appState.counter--;
      }
    }
    updateAllImages();
  });
});

incDec.forEach((btn) => {
  btn.addEventListener("click", addToCart);
});

deleteItems.addEventListener("click", deleteCartItems);
desktopGalleryMainImg.addEventListener("click", showLightBox);
lightboxClose.addEventListener("click", showLightBox);
addToCartBtn.addEventListener("click", showCart);
hamburger.addEventListener("click", toggleSideBar);
closeSidebar.addEventListener("click", toggleSideBar);
cartIconContainer.addEventListener("click", toggleCartDropdown);
