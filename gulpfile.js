'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require("gulp-autoprefixer"),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    wait = require('gulp-wait'),
    pug = require('gulp-pug'),
    //settings
    newer = require("gulp-newer"),
    debug = require("gulp-debug"),
    notify = require("gulp-notify"),
    plumber = require("gulp-plumber"),
    gulpif = require("gulp-if"),
    browserSync = require('browser-sync').create(),
    rimraf = require("rimraf");
const webpack = require('webpack-stream');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');

let isDev = true;

let webpackConfig = {
    output: {
        filename: "webpack.js"
    },
    module: {
        rules: [{
            test: "/\.js$/",
            loader: "babel-loader",
            exclude: "/node_modules/"
        }]
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : 'none',
};

gulp.task('webpack', function () {
    return gulp.src('src/assets/js/src/main.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('build/assets/js/dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('pug', function () {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(debug({
            title: "pug"
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({
            stream: true
        }));
    // .pipe(notify("Change html"));
});
gulp.task("scss", function () {
    return gulp.src('src/assets/sass/my.scss')
        .pipe(plumber())
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(wait(500))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', notify.onError(function (error) {
            return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
        })))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulpif(isDev, sourcemaps.write('.')))
        .pipe(gulp.dest('build/assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
    // .pipe(notify("Change css"));
});
gulp.task("libs", function () {
    return gulp.src('src/assets/libs/**/*.*', {
        since: gulp.lastRun('libs')
    })
        .pipe(newer('src/assets/libs/**/*.*'))
        .pipe(gulp.dest('build/assets/libs'))
        .on('end', browserSync.reload);
});
gulp.task("favicon", function () {
    return gulp.src("src/favicon.ico")
        .pipe(gulp.dest("build/"))
        .on('end', browserSync.reload);
});
gulp.task("fonts", function () {
    return gulp.src('src/assets/fonts/**/*.*', {
        since: gulp.lastRun('fonts')
    })
        .pipe(newer('build/assets/fonts'))
        .pipe(gulp.dest('build/assets/fonts'))
        .on('end', browserSync.reload);
});
gulp.task("alljs", function () {
    return gulp.src('src/assets/js/*.js')
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("jquery", function () {
    return gulp.src('src/assets/jquery/custom-jquery.js')
        .pipe(gulp.dest('build/assets/jquery/'))
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
gulp.task("image", function () {
    return gulp.src('src/assets/i/**/*.*', {
        since: gulp.lastRun('image')
    })
        .pipe(newer('build/assets/i'))
        .pipe(debug({
            title: "image"
        }))
        .pipe(gulp.dest('build/assets/i'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task("clean", function (cb) {
    return rimraf('build/', cb);
});
gulp.task("watch", function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        notify: true
    });
    gulp.watch('src/assets/sass/**/*.scss', gulp.series('scss'));
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/assets/js/**/*.js', gulp.series('webpack'));
    gulp.watch('src/assets/jquery/*.js', gulp.series('jquery'));
    gulp.watch(['src/assets/i/**/*.*'], gulp.series("image"));
    gulp.watch(['src/assets/libs/**/*.*'], gulp.series("libs"));
    gulp.watch(['src/assets/fonts/**/*.*'], gulp.series("fonts"));
    gulp.watch(['src/assets/audio/**/*.*'], gulp.series("audio"));
});
let build = gulp.series('clean', gulp.parallel('webpack', 'jquery', 'pug', 'scss', 'alljs', 'fonts', 'audio', 'image', 'libs', 'favicon'));

gulp.task('build', build);

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('build', 'watch')
));
