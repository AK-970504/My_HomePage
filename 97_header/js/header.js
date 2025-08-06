//header.htmlの[id="header_main"]の要素を取得してHeaderMainという変数に代入
const HeaderMain = document.getElementById('header_main');
//ウィンドウがスクロールされるたびに中の関数を実行
window.addEventListener('scroll', () => {
	//縦方向に50px以上スクロールされたか
	if (window.scrollY > 50) {
		//超えた場合は[header]に[class="scrolled"]を追加
		HeaderMain.classList.add('scrolled');
	//超えていない場合
	} else {
		//[header]から[class="scrolled"]を削除
		HeaderMain.classList.remove('scrolled');
	}
});
function background() {
	console.log("背景アニメーション初期化");
	//季節判定と呼び出し
	function startSeasonEffect() {
		//月現在の月を[month]に代入
		//[getMonth()]は0始まりであることから+1とする
		const month = new Date().getMonth() + 1;
		if (1 <= month && month <= 3) {
			startSnow();
		} else if (4 <= month && month <= 6) {
			startSakura();
		} else if (7 <= month && month <= 8) {
			startFireworks();
		} else  if (9 <= month && month <= 11) {
			startAutumn();
		} else if (12 === month) {
			startSnow();
		}
	}
	startSeasonEffect();
	//[header]の高さ取得
	function getHeaderHeight() {
		const header = document.getElementById("header_main");
		return header ? header.offsetHeight : window.innerHeight;
	}
	//雪のエフェクト
	function startSnow() {
		const canvas = document.getElementById("sunlight");
		if(!canvas) return;
		const ctx = canvas.getContext("2d");
		let width = canvas.width = window.innerWidth;
		let height = canvas.height = getHeaderHeight();
		const snowflakes = Array.from({ length: 100 }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			radius: Math.random() * 3 + 1,
			speedY: Math.random() * 1 + 0.5,
		}));
		function animate() {
			ctx.fillStyle = "rgba(210, 239, 255, 0.8)";
			ctx.fillRect(0, 0, width, height);
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			snowflakes.forEach(flake => {
				ctx.beginPath();
				ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
				ctx.fill();
				flake.y += flake.speedY;
				if (flake.y > height) flake.y = 0;
			});
			requestAnimationFrame(animate);
		}
		animate();
		window.addEventListener('resize', () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = getHeaderHeight();
		})
	}
	// 桜のエフェクト
	function startSakura() {
		const canvas = document.getElementById("sunlight");
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let width = canvas.width = window.innerWidth;
		let height = canvas.height = getHeaderHeight();
		const petals = Array.from({ length: 50 }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			size: Math.random() * 6 + 10,
			speedY: Math.random() * 1 + 0.5,
			speedX: Math.random() * 0.5 - 0.25
		}));
		function draw() {
			ctx.fillStyle = "rgba(255, 210, 225, 0.8)";
			ctx.fillRect(0, 0, width, height);
			ctx.fillStyle = "rgba(255, 180, 195, 0.8)";
			petals.forEach(p => {
				ctx.beginPath();
				ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, Math.PI / 4, 0, Math.PI * 2);
				ctx.fill();
				p.y += p.speedY;
				p.x += p.speedX;
				if (p.y > height) p.y = 0;
				if (p.x < 0 || p.x > width) p.x = Math.random() * width;
			});
			requestAnimationFrame(draw);
		}
		draw();
		window.addEventListener("resize", () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = getHeaderHeight();
		});
	}
	// 花火エフェクト
	function startFireworks() {
		const canvas = document.getElementById("sunlight");
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let width = canvas.width = window.innerWidth;
		let height = canvas.height = getHeaderHeight();
		let particles = [];
		function createFirework() {
			const x = Math.random() * width;
			const y = Math.random() * height / 2;
			const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
			for (let i = 0; i < 30; i++) {
				const angle = Math.random() * Math.PI * 2;
				const speed = Math.random() * 3 + 2;
				particles.push({
					x, y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					radius: 2,
					alpha: 1,
					color
				});
			}
			if (particles.length > 1000) {
				particles.splice(0, particles.length - 1000);
				return;
			}
		}
		function animate() {
			ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
			ctx.fillRect(0, 0, width, height);
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;
				p.alpha -= 0.01;
				if (p.alpha <= 0) {
					particles.splice(i, 1);
				} else {
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
					ctx.fillStyle = p.color;
					ctx.globalAlpha = p.alpha;
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;
			requestAnimationFrame(animate);
		}
		animate();
		let fireworkIntervalId = setInterval(() => {
			if(!document.hidden) {
				createFirework();
			}
		}, 1000);
		window.addEventListener("resize", () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = getHeaderHeight();
		});
		//タブが非表示になったときは打ち上げを一時停止
		document.addEventListener("visibilitychange", () => {
			if (document.hidden && fireworkIntervalId) {
				clearInterval(fireworkIntervalId);
				fireworkIntervalId = null;
			} else if (!document.hidden && fireworkIntervalId === null) {
				fireworkIntervalId = setInterval(createFirework, 1000);
			}
		});
	}
	// 紅葉エフェクト
	function startAutumn() {
		const canvas = document.getElementById("sunlight");
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let width = canvas.width = window.innerWidth;
		let height = canvas.height = getHeaderHeight();
		const leaves = Array.from({ length: 60 }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			size: Math.random() * 8 + 4,
			speedY: Math.random() * 1 + 0.5,
			speedX: Math.random() * 0.5 - 0.25,
			color: `rgba(255, ${100 + Math.random() * 100}, 0, 0.8)`
		}));
		function animate() {
			ctx.fillStyle = "rgba(255, 160, 95, 1)";
			ctx.fillRect(0, 0, width, height);
			leaves.forEach(l => {
				ctx.beginPath();
				ctx.ellipse(l.x, l.y, l.size, l.size * 0.5, Math.PI / 6, 0, Math.PI * 2);
				ctx.fillStyle = l.color;
				ctx.fill();
				l.y += l.speedY;
				l.x += l.speedX;
				if (l.y > height) l.y = 0;
				if (l.x < 0 || l.x > width) l.x = Math.random() * width;
			});
			requestAnimationFrame(animate);
		}
		animate();
		window.addEventListener("resize", () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = getHeaderHeight();
		});
	}
}
//header_titleの文字色設定
function HeaderColor() {
	function changeTitleColorIfSummer() {
		const month = new Date().getMonth() + 1;
		if (7 <= month && month <= 8) {
			const titleElement = document.querySelector('.header_top_title');
			if(titleElement) {
				titleElement.style.color = "rgba(225, 225, 225, 1)";
				const h2Link = titleElement.querySelector("h2 a");
				const p = titleElement .querySelector("p");
				if (h2Link) h2Link.style.color = "rgba(225, 225, 225, 1)";
				if (p) p.style.color = "rgba(225, 225, 225, 1)";
			}
			const catchphrase = document.getElementById("catchphrase");
			if(catchphrase) {
				catchphrase.style.color = "rgba(225, 225, 225, 1)";
			}
		}
	}
	changeTitleColorIfSummer();
}
//バーガーメニュー
function initBurgerMenu() {
	console.log("バーガーメニュー初期化");
	const burger = document.getElementById('burger');
	const nav = document.getElementById('header_menu');
	if (!burger || !nav) return;
	const month = new Date().getMonth() + 1;
	if (7 <= month && month <= 8) {
		const burgerLines = burger.querySelectorAll('span');
		burgerLines.forEach(line => {
			line.style.backgroundColor = "rgba(225, 225, 225, 1)"
		});
	}
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
	// ドラッグ無効化
	const elements = document.querySelectorAll('a, img');
	elements.forEach(el => {
		el.addEventListener('dragstart', (e) => {
			e.preventDefault();
		});
	});
}
//スライダー
function initSlider() {
	console.log("スライダー初期化");
	function preloadSliderImages(callback) {
		const images = document.querySelectorAll('.slider img');
		let loadedCount = 0;
		if (images.length === 0) {
			callback();
			return;
		}
		images.forEach(img => {
			if (img.complete) {
				img.classList.add('loaded');
				loadedCount++;
				if (loadedCount === images.length) callback();
			} else {
				img.onload = () => {
					img.classList.add('loaded');
					loadedCount++;
					if (loadedCount === images.length) callback();
				};
			}
		});
	};
	function initializeAfterImagesLoaded() {
		const sliderImages = document.querySelector(".slider_images");
		const slides = document.querySelectorAll(".slider");
		const prevBtn = document.getElementById("prev");
		const nextBtn = document.getElementById("next");
		const sliderWindow = document.querySelector('.slider_window');
		const totalSlides = slides.length;
		let currentIndex = 1;
		if (!sliderImages || totalSlides === 0 || !prevBtn || !nextBtn || !sliderWindow) {
			console.warn('Slider elements not found');
			return;
		}
		// 7月・8月は背景白＋文字黒に
		const month = new Date().getMonth() + 1;
		if (7 <= month && month <= 8) {
			console.log("夏季モード：背景白＋文字黒");
			sliderWindow.style.backgroundColor = "rgba(255, 255, 255, 1)";
			slides.forEach(slide => {
				const textElements = slide.querySelectorAll('p, span, h2, a');
				textElements.forEach(el => {
					el.style.color = "rgba(0, 0, 0, 1)";
				});
			});
			prevBtn.style.backgroundColor = "rgba(255, 255, 255, 1)";
			prevBtn.style.color = "rgba(0, 0, 0, 1)";
			nextBtn.style.backgroundColor = "rgba(255, 255, 255, 1)";
			nextBtn.style.color = "rgba(0, 0, 0, 1)";
		}
		//スライド表示更新
		function updateSlider(animate = true) {
			const slide = slides[0];
			const slideStyles = window.getComputedStyle(slide);
			const slideWidth = slide.getBoundingClientRect().width;
			const marginLeft = parseFloat(slideStyles.marginLeft);
			const marginRight = parseFloat(slideStyles.marginRight);
			const totalSlideWidth = slideWidth + marginLeft + marginRight;
			const windowWidth = sliderWindow.offsetWidth;
			const offset = totalSlideWidth * currentIndex - (windowWidth / 2) + (totalSlideWidth / 2);
			sliderImages.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
			sliderImages.style.transform = `translateX(-${offset}px)`;
		}
		//前へボタン
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
		//次へボタン
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
		//ウィンドウリサイズ対応
		window.addEventListener("resize", () => updateSlider(false));
		//初回表示
		updateSlider(false);
		//スクロール時に<header>に[scrolled]クラスを付与
		const HeaderMain = document.getElementById('header_main');
		if (HeaderMain) {
			window.addEventListener('scroll', () => {
				if (window.scrollY > 50) {
					HeaderMain.classList.add('scrolled');
				} else {
					HeaderMain.classList.remove('scrolled');
				}
			});
		}
	}
	preloadSliderImages(() => {
		initializeAfterImagesLoaded();
	});
}
document.addEventListener("DOMContentLoaded", () => {
	initSlider();
	background();
	HeaderColor();
	initBurgerMenu();
	const HeaderMain = document.getElementById('header_main');
	if (HeaderMain) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 50) {
				HeaderMain.classList.add('scrolled');
			} else {
				HeaderMain.classList.remove('scrolled');
			}
		});
	}
});