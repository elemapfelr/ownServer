// document.querySelector('header .top .text .notiWrap ul li');

function headerSlider() {
	let i = 0;
	setInterval(() => {
		i++;
		if (i > document.querySelectorAll('header .top .text .notiWrap ul li').length - 1) {
			i = 0;
		}
		document.querySelector('header .top .text .notiWrap ul').style.top = i * -20 + 'px';
	}, 5000);
}
headerSlider();
