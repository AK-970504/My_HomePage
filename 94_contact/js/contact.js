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
//記入項目に関する事項
document.querySelector('form').addEventListener('submit', function (e) {
	//デバッグ用、動作確認後に削除
	e.preventDefault();
	let errors = [];
	//1.お問合せ種別
	if (!document.querySelector('input[name="type"]:checked')) {
		errors.push('・お問合せ種別を選択して下さい');
	}
	//2.お名前
	const name01 = document.getElementById('name_01').value.trim();
	if (!name01) {
		errors.push('・お名前を入力して下さい');
	}
	//3.フリガナ
	const name02 = document.getElementById('name_02').value.trim();
	if (!name02) {
		errors.push('・お名前(カタカナ)を入力して下さい');
	} else if (!/^[\u30A0-\u30FFー\s]+$/.test(name02)) {
		errors.push('・フリガナは全角カタカナで入力して下さい');
	}
	//4.メールアドレス
	const email = document.getElementById('email').value.trim();
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(!email) {
		errors.push('・メールアドレスを入力して下さい');
	} else if (!emailPattern.test(email)) {
		errors.push('・正しいメールアドレスの形式で入力して下さい');
	}
	//5.お問合せ内容
	const messageValue = document.getElementById('message').value.trim();
	if(!messageValue) {
		errors.push('・お問合せ内容を入力して下さい');
	}
	console.log(errors);
	//エラーがあればまとめて表示
	if (0 < errors.length) {
		alert('【以下の項目を入力して下さい】\n' + errors.join('\n'));
	} else {
		this.submit();
	}
})
//画像選択に関する事項
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