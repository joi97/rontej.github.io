/*=============== CHANGE BACKGROUND HEADER ===============*/

/*=============== WORK MODAL ===============*/
const modalViews = document.querySelectorAll(".service__modal"),
	modalBtns = document.querySelectorAll(".work__button"),
	modalClose = document.querySelectorAll(".service__modal-close");

let modal = function (modalClick) {
	modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
	mb.addEventListener("click", () => {
		modal(i);
	});
});

modalClose.forEach((mc) => {
	mc.addEventListener("click", () => {
		modalViews.forEach((mv) => {
			mv.classList.remove("active-modal");
		});
	});
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup(".work__container", {
	selectors: {
		target: ".work__card",
	},
	animation: {
		duration: 300,
	},
});
/* Link active work */
const linkWork = document.querySelectorAll(".work__item");

function activeWork() {
	linkWork.forEach((l) => l.classList.remove("active-work"));
	this.classList.add("active-work");
}

linkWork.forEach((l) => l.addEventListener("click", activeWork));

/*=============== SWIPER TESTIMONIAL ===============*/

// let swiperTestimonial = new Swiper(".testimonial__container", {
// 	spaceBetween: 24,
// 	loop: true,
// 	grabCursos: true,
// 	pagination: {
// 		el: ".swiper-pagination",
// 		clickable: true,
// 	},
// });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	// develop header scroll
	var header = document.querySelector("header");
	var nav__logo = document.querySelector("a.nav__logo");
	var change__theme = document.querySelector("i.change-theme");
	header.classList.toggle("sticky", window.scrollY > 0);
	nav__logo.classList.toggle("sticky", window.scrollY > 0);
	change__theme.classList.toggle("sticky", window.scrollY > 0);

	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight,
			sectionTop = current.offsetTop - 58,
			sectionId = current.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.add("active-link");
		} else {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.remove("active-link");
		}
	});
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
	document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
	themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
	// If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
	document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
		lightTheme
	);
	themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
		iconTheme
	);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
	// Add or remove the light / icon theme
	document.body.classList.toggle(lightTheme);
	themeButton.classList.toggle(iconTheme);
	// We save the theme and the current icon that the user chose
	localStorage.setItem("selected-theme", getCurrentTheme());
	localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== GALLERY ===============*/
let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
	galleryImages.forEach(function (image, index) {
		image.onclick = function () {
			let getElementCss = window.getComputedStyle(image);
			let getFullImageUrl =
				getElementCss.getPropertyValue("background-image");
			let getImgUrlPos = getFullImageUrl.split("/img/matrimonio/"); // thumbs

			let setNewImgUrl = getImgUrlPos[1].replace('")', "");
			getLatestOpenedImg = index + 1;

			let container = document.body;
			let newImgWindow = document.createElement("div");
			container.appendChild(newImgWindow);
			newImgWindow.setAttribute("class", "img-window");
			newImgWindow.setAttribute("onclick", "closeImg()");

			let newImg = document.createElement("img");
			newImgWindow.appendChild(newImg);
			newImg.setAttribute("src", "assets/img/matrimonio/" + setNewImgUrl);
			newImg.setAttribute("id", "current-img");

			newImg.onload = function () {
				let imgWidth = this.width;
				let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

				let newPrevBtn = document.createElement("a");
				let btnPrevText = document.createTextNode("Prev");
				newPrevBtn.appendChild(btnPrevText);
				container.appendChild(newPrevBtn);
				newPrevBtn.setAttribute("class", "img-btn-prev");
				newPrevBtn.setAttribute("onclick", "changeImg(0)");
				newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";

				let newNextBtn = document.createElement("a");
				let btnNextText = document.createTextNode("Next");
				newNextBtn.appendChild(btnNextText);
				container.appendChild(newNextBtn);
				newNextBtn.setAttribute("class", "img-btn-next");
				newNextBtn.setAttribute("onclick", "changeImg(1)");
				newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";
			};

			// background-image: url(../img/matrimonio/img-1.jpg);
		};
	});
}

function closeImg() {
	document.querySelector(".img-window").remove();
	document.querySelector(".img-btn-next").remove();
	document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
	document.querySelector("#current-img").remove();
	let getImgWindow = document.querySelector(".img-window");
	let newImg = document.createElement("img");
	getImgWindow.appendChild(newImg);

	let calcNewImg;
	if (changeDir === 1) {
		calcNewImg = getLatestOpenedImg + 1;
		if (calcNewImg > galleryImages.length) {
			calcNewImg = 1;
		}
	} else if (changeDir === 0) {
		calcNewImg = getLatestOpenedImg - 1;
		if (calcNewImg < 1) {
			calcNewImg = galleryImages.length;
		}
	}

	newImg.setAttribute(
		"src",
		"assets/img/matrimonio/img-" + calcNewImg + ".jpg"
	);
	newImg.setAttribute("id", "current-img");

	getLatestOpenedImg = calcNewImg;

	// newImg.onload = function () {
	// 	let imgWidth = this.width;
	// 	let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

	// 	let nextBtn = document.querySelector(".img-btn-next");
	// 	nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

	// 	let prevBtn = document.querySelector(".img-btn-prev");
	// 	prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
	// };
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
