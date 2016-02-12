'use strict';

let gulp = require('gulp'),
	babel = require('gulp-babel'),
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	runSequence = require('run-sequence'),
	del = require('del');

let DST = 'dist';

let path = {
	'html': 'app/*.html',
	'partials': 'app/partials/**/*.html',
	'css': 'app/css/**/*.css',
	'scripts': 'app/js/**/*.js',
	'images': 'app/img/**/*',
	'js': [DST + '/scripts/vendors.js', DST + '/scripts/app.js']
};

// Include plugins
let plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

let mainBowerFiles = require('main-bower-files');

// Bower components
gulp.task('vendor', () => {
	return gulp.src(mainBowerFiles())
		.pipe(plugins.filter('*.js'))
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest(DST + '/scripts'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(DST + '/scripts'))
		.pipe(notify({ message: 'Vendor task complete' }));
});

// Scripts
gulp.task('scripts', () => {
	return gulp.src(path.scripts)
		.pipe(jshint.reporter('default'))
		.pipe(babel())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(DST + '/scripts'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(DST + '/scripts'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

// JS
gulp.task('js', ['scripts', 'vendor'], () => {
	return gulp.src(path.js)
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(DST + '/scripts'))
		.pipe(notify({ message: 'JS task complete' }));
});

// Html
gulp.task('html', () => {
	return gulp.src(path.html)
		.pipe(gulp.dest(DST));
});

gulp.task('partials', () => {
	return gulp.src(path.partials)
		.pipe(gulp.dest(DST + '/partials'));
});

// Images
gulp.task('images', () => {
	return gulp.src(path.images)
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest(DST + '/img'));
});

gulp.task('css', () => {
	return gulp.src(path.css)
		.pipe(concat('style.css'))
		.pipe(gulp.dest(DST + '/css'))
		.pipe(notify({ message: 'css task complete'}));
});

// Clean
gulp.task('clean', () => {
	return del([DST + '/scripts', DST + '/images']);
});

// Localhost
gulp.task('connect', () => {
	connect.server({
		root: 'dist',
	    port: '4000',
	    livereload: true
  	});
});

// Default task
gulp.task('default', () => {
	runSequence('clean',
				['html', 'partials', 'js', 'css', 'images'],
				'connect',
				'watch');
});

// Watch
gulp.task('watch', () => {
	// Watch html filters
	gulp.watch(path.html, ['html']);
	// Watch .js files
	gulp.watch(path.scripts, ['scripts']);
	// Watch image files
	gulp.watch(path.images, ['images']);
	// Watch css files
	gulp.watch(path.css, ['css']);
	// Create LiveReload server
	livereload.listen();
});
