import divide from "./modules/libs";
import animationTitle from "./modules/animation";
import customJquery from "./modules/custom-jquery";
window.addEventListener('DOMContentLoaded', function (){
	console.log(divide(10));
	console.log(divide(4, 3));
	animationTitle();
	customJquery();
});
