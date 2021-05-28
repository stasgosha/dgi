// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .mobile-top-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});

document.addEventListener('DOMContentLoaded', function(){

	const isRTL = $('html').attr('dir') == 'rtl';
	const isMobile = $(window).width() < 992;

	if (isRTL) {
		$('.wpcf7').attr('dir','rtl');
	} else{
		$('.wpcf7').attr('dir','ltr');
	}

	function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}

	if(is_touch_device()){
		$('body').addClass('touch');
	} else{
		$('body').addClass('no-touch');
	}

	// Select Field
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: true,
		fakeDropInBody: true
	});

	jcf.replace( $('.select-field select') );


	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	// Cookies
	// console.log(localStorage.getItem('cookies'));
	if (localStorage.getItem('cookies') == null) {
		// 0 - declined
		// 1 - accepted
		// null - first visit; not clicked

		let cookiesBlock = $('.cookies-block');

		setTimeout(function(){
			cookiesBlock.addClass('visible');
		}, 300);

		cookiesBlock.find('.js-close').click(function(e){
			e.preventDefault();

			cookiesBlock.removeClass('visible');
		});

		cookiesBlock.find('.js-decline').click(function(e){
			e.preventDefault();

			cookiesBlock.removeClass('visible');
			localStorage.setItem('cookies', '0');
		});

		cookiesBlock.find('.js-accept').click(function(e){
			e.preventDefault();

			cookiesBlock.removeClass('visible');
			localStorage.setItem('cookies', '1');
		});
	}

	// Search
	$('.header-search-form').each(function(i, cmp){
		$(cmp).find('input').on('focusout', function(){
			$(this).data('saved', $(this).val());
			$(this).val('');
		});

		$(cmp).find('input').on('focusin', function(){
			$(this).val( $(this).data('saved') );
		});
	});

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill-rule="evenodd" clip-rule="evenodd" d="M36 20.75H4v-1.5h32v1.5z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.47 20.53a.75.75 0 010-1.06l11-11 1.06 1.06L5.06 20l10.47 10.47-1.06 1.06-11-11z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 20.75h32v-1.5H4v1.5z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M36.53 20.53c.3-.3.3-.77 0-1.06l-11-11-1.06 1.06L34.94 20 24.47 30.47l1.06 1.06 11-11z"/></svg></button>'
	}

	$('.areas-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		dots: true,
		arrows: false,
		speed: 800
	});

	equalSlideHeight('.areas-slider');

	$('.js-featured-articles-scope').each(function(i, scope){
		let slider = $(scope).find('.featured-articles-slider');
		let slideNav = $(scope).find('.slider-nav');

		slider.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true,
			dots: false,
			arrows: true,
			...arrowsButtons,
			appendArrows: slideNav,
			speed: 800
		});

		equalSlideHeight( slider );
	});

	if ($(window).width() < 992) {
		$('.js-big-areas-slider-scope').each(function(i, scope){
			let slider = $(scope).find('.big-areas-slider');
			let slideNav = $(scope).find('.slider-nav');

			slider.on('init', function (e, slick) {
				$(scope).find('.slider-nav .current').text('1');
				$(scope).find('.slider-nav .total').text(slick.slideCount);
			});

			slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				$(scope).find('.slider-nav .current').text(nextSlide + 1);
			});

			slider.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: false,
				arrows: true,
				...arrowsButtons,
				appendArrows: slideNav,
				speed: 500
			});

			equalSlideHeight( slider );
		});
	}

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 72;

		if ($(window).width() < 992) {
			offset = 56;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');

		$('.header').removeClass('search-opened');
		$('.mobile-search').removeClass('opened');
		$('.mobile-search-form-trigger').removeClass('active');
	});

	// Mobile Search
	$('.mobile-search-form-trigger').click(function(e){
		e.preventDefault();

		$('.menu-opener').removeClass('active');
		$('.mobile-top-nav').removeClass('opened');
		$('.header').removeClass('nav-opened');

		$('.header').toggleClass('search-opened');
		$('.mobile-search').toggleClass('opened');
		$(this).toggleClass('active');
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);
});

function showCookiesBlock(){
	$('.cookies-block').addClass('visible');
}