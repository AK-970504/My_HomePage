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
document.querySelector('form').addEventListener('submit', function (e) {
	let messages = [];
	if (!document.querySelector('input[name="type"]:checked')) {
		messages.push('お問合せ種別を選択して下さい');
	}
	const requiredFields= [
		{ id: 'name_01', msg: 'お名前(漢字)を入力して下さい'},
		{ id: 'name_02', msg: 'お名前(カタカナ)を入力して下さい'},
		{ id: 'message', msg: 'お問合せ内容を入力して下さい'},
	];
	requiredFields.forEach(filed => {
		const el = document.getElementById(filed.id);
		if (!el.value.trim()) {
			messages.push(filed.msg);
		}
	});
	const furigana = document.getElementById('name_02').value.trim();
	if (furigana && !/^[\u30A0-\u30FFー\s]+$/.test(furigana)) {
		messages.push('フリガナは全角カタカナで入力して下さい')
	}
	const email = document.getElementById('email').value.trim();
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(!email) {
		messages.push('メールアドレスを入力して下さい');
	} else if (!emailPattern.test(email)) {
		messages.push('正しいメールアドレスの形式で入力して下さい');
	}
	if (0 < messages.length) {
		alert('【以下の項目を入力して下さい】\n・' + messages.join('\n・'));
		e.preventDefault();
	}
})
document.querySelectorAll('input[type="file"]').forEach(input => {
	input.addEventListener('change', e => {
		const file = e.target.files[0];
		const label = document.querySelector(`label[for="${input.id}"]`);
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = ev => {
				label.innerHTML = `<img src="${ev.target.result}" alt="preview">`;
			};
			reader.readAsDataURL(file);
		} else {
			label.innerHTML = '画像選択';
		}
	});
});
if (location.search.includes('sent=1')) {
	window.scrollTo(0, 0);
	alert('送信が完了しました');
	history.replaceState(null, '', location.pathname);
}