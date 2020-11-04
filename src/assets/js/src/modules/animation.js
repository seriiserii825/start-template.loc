import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let animationTitle = () => {

	const tl = gsap.timeline();

	tl.from('h1', {
		opacity: 0,
		y: -80,
		duration: 2
	});

	tl.from('p', {
		opacity: 0,
		y: 80,
		duration: 2
	});

	gsap.from('.my-button', {
		x: 600,
		duration: 3,
		scrollTrigger: {
			start: 'top 100%',
			trigger: '.my-button',
			markers: true,
			scrub: true
		}
	});
};
export default animationTitle;
