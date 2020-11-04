import $ from 'jquery';

let customJquery = function () {
	$(function () {
		$('.open-list').on('click', (e) => {
			e.preventDefault();
			$('.sub-menu').slideToggle();
		});
	});
};

export default customJquery;