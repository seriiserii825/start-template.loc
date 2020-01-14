'use strict';

let gulp = require('gulp'),
	//css
	// stylus = require('gulp-stylus'),
	sass = require('gulp-sass'),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
	csso = require('gulp-csso'),
	//html
	pug = require('gulp-pug'),
	//js
	babel = require("gulp-babel"),
	uglify = require('gulp-uglify'),
	//svg
	cheerio = require('gulp-cheerio'),
	svgmin = require('gulp-svgmin'),
	rename = require('gulp-rename'),
	svgSprite = require('gulp-svg-sprite'),
	cleanSvg   = require('gulp-cheerio-clean-svg'),
	svgBg = require("gulp-svg-sprites"),
	//images
	webp = require('gulp-webp'),
	tinypng = require('gulp-tinypng-compress'),
	//fonts
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	//settings
	newer = require("gulp-newer"),
	debug = require("gulp-debug"),
	notify = require("gulp-notify"),
	rigger = require("gulp-rigger"),
	plumber = require("gulp-plumber"),
	browserSync = require('browser-sync').create(),
	rimraf = require("rimraf"),
	gulpif = require("gulp-if"),
	replace = require('gulp-replace');

gulp.task('ttf2woff', function(){
return	gulp.src(['src/assets/fonts/*.ttf'])
		.pipe(debug({title: "woff"}))
		.pipe(ttf2woff())
		.pipe(gulp.dest('src/assets/fonts/'));
});

gulp.task('ttf2woff2', function(){
return	gulp.src(['src/assets/fonts/*.ttf'])
		.pipe(debug({title: "woff2"}))
		.pipe(ttf2woff2())
		.pipe(gulp.dest('src/assets/fonts/'));
});

gulp.task('font-convert', gulp.parallel('ttf2woff2', 'ttf2woff'));

//, {since: gulp.lastRun('svg')}
gulp.task('svg', function () {
	return gulp.src('src/assets/i/svg/inline/*.svg')
		.pipe(svgmin({
			js2svg: {
					pretty: true
			}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
				}
			},
			svg: {
				namespaceClassnames: false
			}
		}))
		.pipe(gulp.dest("build/assets/i/svg/inline/"));
});

gulp.task('svg-bg', function () {
		return gulp.src('src/assets/i/svg/bg/*.svg', {since: gulp.lastRun('svg')})
				.pipe(newer('build/assets/i/svg/bg'))
				.pipe(svgBg())
				.pipe(gulp.dest("build/assets/i/svg/bg"));
});

gulp.task('pug', function () {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(debug({title: "pug"}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({
			stream: true
		}));
	// .pipe(notify("Change html"));
});


gulp.task("css", function () {
	return gulp.src('src/assets/sass/my.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(wait(500))
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError(function (error) {
			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
		})))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/assets/css/'))
		.pipe(browserSync.reload({
			stream: true
		}));
	// .pipe(notify("Change css"));
});

//============================

gulp.task("libs", function () {
	return gulp.src('src/assets/libs/**/*.*', {since: gulp.lastRun('libs')})
		.pipe(newer('src/assets/libs/**/*.*'))
		.pipe(gulp.dest('build/assets/libs'))
		.on('end', browserSync.reload);
});

/* favicon:build
====================================================*/
gulp.task("favicon", function () {
	return gulp.src("src/favicon.ico")
		.pipe(gulp.dest("build/"))
		.on('end', browserSync.reload);
});

/* fonts:build
====================================================*/
gulp.task("fonts", function () {
	return gulp.src('src/assets/fonts/**/*.*', {since: gulp.lastRun('fonts')})
		.pipe(newer('build/assets/fonts'))
		.pipe(gulp.dest('build/assets/fonts'))
		.on('end', browserSync.reload);
});


gulp.task("webp", function () {
	return gulp.src('src/assets/i/**/*.{jpg, png}', {since: gulp.lastRun('webp')})
		.pipe(newer('build/assets/i'))
		.pipe(debug({title: "webp"}))
		.pipe(webp())
		.pipe(gulp.dest('build/assets/i'))
		.on('end', browserSync.reload);
});

gulp.task("js", function () {
	return gulp.src('src/assets/js/main.js')
		.pipe(gulp.dest('build/assets/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
	// .pipe(notify("Change js"));
});

gulp.task("alljs", function(){
	return gulp.src('src/assets/js/*.js')
		.pipe(gulp.dest('build/assets/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("audio", function () {
	return gulp.src('src/assets/audio/**/*.*')
		.pipe(gulp.dest('build/assets/audio/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/* image:dev
====================================================*/
gulp.task("image", function () {
	return gulp.src('src/assets/i/**/*.*', {since: gulp.lastRun('image')})
		// .pipe(newer('build/assets/i'))
		.pipe(debug({title: "image"}))
		// .pipe(gulpif('*.svg', svgmin({
		//   js2svg: {
		//     pretty: true
		//   }
		// })))
		.pipe(gulp.dest('build/assets/i'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("tynipng", function (cb) {
	return gulp.src('src/assets/i/*.*')
		.pipe(gulpif('*.{jpg,png}',
			tinypng({
					key: 'n3bfGZY6wU3OWNZZAIigLe444WovtR9_',
					sigFile: 'src/assets/i/.tinypng-sigs',
					log: true
				})
			))
		.pipe(gulp.dest('build/assets/i'));
});

gulp.task("clean", function (cb) {
	return rimraf('build/', cb);
});

gulp.task("watch", function () {
	gulp.watch('src/assets/sass/**/*.scss', gulp.series('css'));
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('src/assets/js/main.js', gulp.series('js'));
	gulp.watch('src/assets/js/**/*.js', gulp.series('alljs'));
	gulp.watch(['src/assets/i/**/*.*'], gulp.series("image"));
	gulp.watch(['src/assets/libs/**/*.*'], gulp.series("libs"));
	gulp.watch(['src/assets/i/svg/inline/*.*'], gulp.series("svg"));
	gulp.watch(['src/assets/i/svg/bg/*.*'], gulp.series("svg-bg"));
	gulp.watch(['src/assets/fonts/**/*.*'], gulp.series("fonts"));
	gulp.watch(['src/assets/audio/**/*.*'], gulp.series("audio"));
});

gulp.task('browser-sync', function () {

	browserSync.init({
		server: {
			baseDir: "./build/"
		},
		notify: true
	});
});

gulp.task('default', gulp.series(
	'clean',
	'svg',
	gulp.parallel(
		'css',
		'js',
		'alljs',
		// 'webp',
		// 'svg-bg',
		'fonts',
		'audio',
		'image',
		'libs',
		'favicon'
	),
	gulp.parallel('pug', 'watch', 'browser-sync')
));
