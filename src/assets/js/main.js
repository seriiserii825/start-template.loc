$(function () {
  /*
      https://www.jqueryscript.net/animation/Smooth-Mouse-Wheel-Scrolling-Plugin-With-jQuery-easeScroll.html
      ===========================*/
  $("html").easeScroll({
    frameRate: 60,
    animationTime: 1000,
    stepSize: 90,
    pulseAlgorithm: 1,
    pulseScale: 8,
    pulseNormalize: 1,
    accelerationDelta: 20,
    accelerationMax: 1,
    keyboardSupport: true,
    arrowScroll: 50,
    touchpadSupport: true,
    fixedBackground: true
  });

	//show menu
	let closeMenu = $('#js-close-menu');
	let showMenu = $('#js-show-menu');
	let navMenu = $('#js-nav-menu');


	closeMenu.on('click', function(){
		closeMenu.hide();
		showMenu.show();
		navMenu.slideUp();
	});

	showMenu.on('click', function(){
		closeMenu.show();
		showMenu.hide();
		navMenu.slideDown();
	});

	//reviews-slider
	$('#js-reviews-slider').slick({

	});

	let videoImage = $('#js-video__img');
	let videoPlay = $('#js-video__play');

	videoPlay.on('click', function(){
		videoPlay.fadeOut();
		videoImage.fadeOut();
	});

});



