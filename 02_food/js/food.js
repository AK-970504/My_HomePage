window.addEventListener("load", () => {
	const loader = document.getElementById("loader");
	if (loader) {
		loader.classList.add("hidden");
	}
});
//header.htmlを読み込んで挿入
fetch('/97_header/header.html').then(res => res.text()).then(data => {
	document.getElementById('header_placeholder').innerHTML = data;
	//cssを手動で追加
	const headerCSS = document.createElement('link');
	headerCSS.rel = "stylesheet";
	headerCSS.href = "/97_header/css/header.css";
	document.head.appendChild(headerCSS);
	//jsを手動で追加
	const headerJS = document.createElement('script');
	headerJS.src = '/97_header/js/header.js';
	//startKomorebi()とinitBurgerMenu()の呼び出し
	headerJS.onload = () => {
		requestAnimationFrame(() => {
			background();
			HeaderColor();
			initBurgerMenu();
			initSlider();
		});
	};
	document.body.appendChild(headerJS);
})
//footer.htmlを読み込んで挿入
fetch('/98_footer/footer.html').then(res => res.text()).then(data => {
	document.getElementById('footer_placeholder').innerHTML = data;
	//cssを手動で追加
	const footerCSS = document.createElement('link');
	footerCSS.rel = "stylesheet";
	footerCSS.href = "/98_footer/css/footer.css";
	document.head.appendChild(footerCSS);
	//jsを手動で追加
	const footerJS = document.createElement('script');
	footerJS.src = '/98_footer/js/footer.js';
	document.body.appendChild(footerJS);
})
//aside.htmlを読み込んで挿入
fetch('/99_aside/aside.html').then(res => res.text()).then(data => {
	document.getElementById('aside_placeholder').innerHTML = data;
	//cssを手動で追加
	const asideCSS = document.createElement('link');
	asideCSS.rel = "stylesheet";
	asideCSS.href = "/99_aside/css/aside.css";
	document.head.appendChild(asideCSS);
	//jsを手動で追加
	const asideJS = document.createElement('script');
	asideJS.src = '/99_aside/js/aside.js';
	document.body.appendChild(asideJS);
})
.catch(err => console.error('読み込みエラー:', err));
document.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelectorAll(".card .btn");
	buttons.forEach(btn => {
		btn.addEventListener("click", (e) => {
			const card = btn.closest(".card");
			const href = btn.getAttribute("href");
			//すべてのカードからactiveを外す
			document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
			//クリックしたカードだけactiveを付与
			card.classList.add("active");
			setTimeout(() => {
				window.location.href = href;
			}, 1000);
		});
	});
});