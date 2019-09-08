/*
Theme Name: Blum
Description: Responsive Coming Soon Template
Author: Erilisdesign
Theme URI: https://preview.erilisdesign.com/html/lana/
Author URI: https://themeforest.net/user/erilisdesign
Version: 3.1
License: https://themeforest.net/licenses/standard
*/

/*------------------------------------------------------
[Table of contents]

1. Preloader
2. Page layout
3. Navigation
4. Animations
5. Backgrounds
6. Countdown
7. Mailchimp
8. Contact Form
------------------------------------------------------*/

(function($) {
	"use strict";

	// Vars
	var $body = $('body'),
		$preloader = $('#preloader'),
		preloaderDelay = 1200,
		preloaderFadeOutTime = 500,
		$siteHeader = $('.site-header'),
		$navToggle = $('#navigation-toggle'),
		firstPart = 'home';

	function getWindowWidth() {
		return Math.max($(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max($(window).height(), window.innerHeight );
	}

	function getDocumentWidth() {
		return Math.max($(document).width(), document.body.clientWidth);
	}

	// [1. Preloader]
	function blum_preloader() {
		$preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
	}

	// [2. Page layout]
	function blum_pageLayout() {
		var siteParts = $('.site-part').length,
			sitePartsWidth = siteParts * getDocumentWidth();

		$('.site-part').css( 'width', getDocumentWidth() );
		$('.site-content-inner').css( 'width', sitePartsWidth );

		if ( getWindowWidth() >= 992  ) {
			$navToggle.removeClass('open');
			$('.header-collapse').css('display', '');
		}
	}

	// [3. Navigation]
	function blum_showSitePart(target) {
		if( $( target ).length > 0 ) {
			if ( $( target ).hasClass('active') ){
				return false;
			}

			var position = $(target).index();
			if ( position > 0 ){
				position = position * -1;
			}
			var	move = position * getDocumentWidth();

			$('.site-content-inner').css('transform', 'translate3d('+move+'px, 0px, 0px)');
			$('.site-part').removeClass('active');
			$('#navigation li').removeClass('active');
			$('#navigation a[href="'+target+'"]').parents('li').addClass('active');
			setTimeout(function(){

				if( !$body.hasClass('mobile') ) {
					$('.site-part .animated').each( function() {
						var elem = $(this),
							animation = elem.data('animation');
						elem.removeClass( animation + " visible" );
					});
				}

				$(target).addClass('active');

				if( !$body.hasClass('mobile') ) {
					$(target).find('.animated').each( function() {
						var elem = $(this),
							animation = elem.data('animation');
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				}

			}, 500);
		}
	}

	function blum_showSitePartResponsive() {
		var currentPart = $('#navigation li.active').find('a').attr('href');
		if( $('#navigation li.active').length === 0 ){
			currentPart = $('#navigation li').first().find('a').attr('href');
		}
		var position = $(currentPart).index();
		if ( position > 0 ){
			position = position * -1;
		}
		var	move = position * getDocumentWidth();

		$('.site-content-inner').css('transform', 'translate3d('+move+'px, 0px, 0px)');
	}

	function blum_navigation() {

		$navToggle.on('click', function(e) {
			e.preventDefault();
			if(!$(this).hasClass('open')){
				$(this).addClass('open');
				$('.header-collapse').slideDown(500);
			} else {
				$('.header-collapse').slideUp(500);
				$(this).removeClass('open');
			}
		});

		$('body').on( 'click', '#navigation a, a.scrollto', function(e) {
			if (this.hash !== '') {
				if( $( this.hash ).length > 0 ) {
					e.preventDefault();

					blum_showSitePart(this.hash);
				}
			}
		});

		$(document).keydown(function(e) {
			if ($('input,select,textarea').is(':focus')){
				return true;
			}

			var currentPart = $('#navigation li.active');
			if( $('#navigation li.active').length === 0 ){
				currentPart = $('#navigation li').first();
			}

			if(e.keyCode == 37 || e.keyCode == 40) { // prev
				var prev_target = currentPart.prev().find('a').attr('href');

				blum_showSitePart(prev_target);
			} else if(e.keyCode == 39 || e.keyCode == 38) { // next
				var next_target = currentPart.next().find('a').attr('href');

				blum_showSitePart(next_target);
			}
		});

	}

	function blum_showFirstPart() {
		$('#navigation a[href="#'+firstPart+'"]').trigger('click');
	}

	// [4. Backgrounds]
	function blum_backgrounds() {

		// Image
		var $bgImage = $('.bg-image-holder');
		if($bgImage.length) {
			$bgImage.each(function(){
				var src = $(this).children('img').attr('src');
				var $self = $(this);

				$self.css('background-image','url('+src+')').children('img').hide();
			});
		}

		// Slideshow
		if ($body.hasClass('slideshow-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-4.jpg' }
				]
			});
		}

		// Slideshow - ZoomOut
		if ($body.hasClass('slideshow-zoom-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 7000,
				transition: 'zoomOut',
				transitionDuration: 4000,
				slides: [
					{ src: 'demo/images/image-4.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-15.jpg' }
				]
			});
		}

		// Slideshow with Video
		if ($body.hasClass('slideshow-video-background')) {
			$body.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/video/marine.jpg',
						video: {
							src: [
								'demo/video/marine.mp4',
								'demo/video/marine.webm',
								'demo/video/marine.ogv'
							],
							loop: false,
							mute: true
						}
					},
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' }
				]
			});
		}

		// Kenburns
		if ($body.hasClass('kenburns-background')) {

			var kenburnsDisplayBackdrops = false;
			var kenburnsBackgrounds = [
				{ src: 'demo/images/image-15.jpg', valign: 'top' },
				{ src: 'demo/images/image-14.jpg', valign: 'top' },
				{ src: 'demo/images/image-17.jpg', valign: 'top' }
			];

			$body.vegas({
				preload: true,
				transition: 'swirlLeft2',
				transitionDuration: 4000,
				timer: false,
				delay: 10000,
				slides: kenburnsBackgrounds,
				walk: function (nb) {
					if (kenburnsDisplayBackdrops === true) {
						var backdrop;

						backdrop = backdrops[nb];
						backdrop.animation = 'kenburns';
						backdrop.animationDuration = 20000;
						backdrop.transition = 'fade';
						backdrop.transitionDuration = 1000;

						$body
							.vegas('options', 'slides', [ backdrop ])
							.vegas('next');
					}
				}
			});
		}

		// Youtube Video
		if ($('#youtube-background').length > 0) {
			var videos = [
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:true, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);
		}

		// Youtube Multiple Videos
		if ($('#youtube-multiple-background').length > 0) {

			var videos = [
				{videoURL: "CG20eBusRg0", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true},
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);

		}

		// Video Background
		if($body.hasClass('mobile')) {
			$('.video-wrapper').css('display', 'none');
		}

		// Granim
		$('[data-gradient-bg]').each(function(index,element){
			var granimParent = $(this),
				granimID = 'granim-'+index+'',
				colours = granimParent.attr('data-gradient-bg'),
				colours = colours.replace(' ',''),
				colours = colours.replace(/'/g, '"')
				colours = JSON.parse( colours );

			// Add canvas
			granimParent.prepend('<canvas id="'+granimID+'"></canvas>');

			var granimInstance = new Granim({
				element: '#'+granimID,
				name: 'basic-gradient',
				direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
				opacity: [1, 1],
				isPausedWhenNotInView: true,
				states : {
					"default-state": {
						gradients: colours
					}
				}
			});
		});

	}

	// [5. Countdown]
	function blum_countdown() {
		var countdown = $('.countdown[data-countdown]');

		if (countdown.length > 0) {
			countdown.each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="countdown-container row"><div class="countdown-item col-6 col-sm-auto"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-item col-6 col-sm-auto"><div class="number">%H</div><span>Hours</span></div><div class="countdown-item col-6 col-sm-auto"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-item col-6 col-sm-auto"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}
	}

	// [6. Mailchimp]
	function blum_mailchimp() {
		var subscribeForm = $('.subscribe-form');
		if( subscribeForm.length < 1 ){ return true; }

		subscribeForm.each( function(){
			var el = $(this),
				elResult = el.find('.subscribe-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						resetForm: true,
						success: function( data ) {
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}

	// [7. Contact Form]
	function blum_contactForm() {
		var contactForm = $('.contact-form');
		if( contactForm.length < 1 ){ return true; }

		contactForm.each( function(){
			var el = $(this),
				elResult = el.find('.contact-form-result');

			el.find('form').validate({
				submitHandler: function(form) {
					elResult.fadeOut( 500 );

					$(form).ajaxSubmit({
						target: elResult,
						dataType: 'json',
						success: function( data ) {
							elResult.html( data.message ).fadeIn( 500 );
							if( data.alert != 'error' ) {
								$(form).clearForm();
								setTimeout(function(){
									elResult.fadeOut( 500 );
								}, 5000);
							};
						}
					});
				}
			});

		});
	}

	// window load function
	$(window).on('load', function() {
		blum_pageLayout();
		blum_preloader();
	});

	// document.ready function
	$(document).ready(function($) {
		blum_pageLayout();
		blum_navigation();
		blum_backgrounds();
		blum_countdown();
		blum_mailchimp();
		blum_contactForm();
		blum_showFirstPart();
	});

	// window.resize function
	$(window).on('resize', function() {
		blum_pageLayout();
		blum_showSitePartResponsive();
	});

})(jQuery);