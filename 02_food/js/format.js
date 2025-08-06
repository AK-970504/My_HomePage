// ハンバーガーメニューとドラッグ防止処理
document.addEventListener('DOMContentLoaded', () => {
	const burger = document.getElementById('burger');
	const nav = document.getElementById('header-menu');
	// ハンバーガーメニューのトグル処理
	burger.addEventListener('click', (event) => {
		event.stopPropagation();
		nav.classList.toggle('active');
	});
	// メニュー内部クリック時は閉じる処理を発動させない
	nav.addEventListener('click', (event) => {
		event.stopPropagation();
	});
	// メニュー以外をクリックしたら閉じる
	document.addEventListener('click', () => {
		nav.classList.remove('active');
	});
	// すべての a タグと img タグのドラッグを無効化（ショートカット防止）
	const elements = document.querySelectorAll('a, img');
	elements.forEach(el => {
		el.addEventListener('dragstart', (e) => {
			e.preventDefault();
		});
	});
});
//スライダー
document.addEventListener('DOMContentLoaded', () => {
	const sliderImages = document.querySelector(".slider-images");
	const slides = document.querySelectorAll(".slider");
	const prevBtn = document.getElementById("prev");
	const nextBtn = document.getElementById("next");
	const totalSlides = slides.length;
	let currentIndex = 1; // クローン分スライド開始を1にする
	function updateSlider(animate = true) {
		const slide = slides[0];
		const slideStyles = window.getComputedStyle(slide);
		const slideWidth = slide.getBoundingClientRect().width;
		const marginLeft = parseFloat(slideStyles.marginLeft);
		const marginRight = parseFloat(slideStyles.marginRight);
		const totalSlideWidth = slideWidth + marginLeft + marginRight;
		const windowWidth = document.querySelector('.slider-window').offsetWidth;
		const offset = totalSlideWidth * currentIndex - (windowWidth / 2) + (totalSlideWidth / 2);
		if (!animate) {
			sliderImages.style.transition = 'none';
		} else {
			sliderImages.style.transition = 'transform 0.5s ease-in-out';
		}
		sliderImages.style.transform = `translateX(-${offset}px)`;
	}
	prevBtn.addEventListener("click", () => {
		currentIndex--;
		updateSlider();
		if (currentIndex === 0) {
			setTimeout(() => {
				currentIndex = totalSlides - 2;
				updateSlider(false);
			}, 500);
		}
	});
	nextBtn.addEventListener("click", () => {
		currentIndex++;
		updateSlider();
		if (currentIndex === totalSlides - 1) {
			setTimeout(() => {
				currentIndex = 1;
				updateSlider(false);
			}, 500);
		}
	});
	window.addEventListener("resize", () => updateSlider(false));
	updateSlider(false);
});