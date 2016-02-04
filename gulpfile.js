var gulp = require('gulp'),
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
	del = require('del');

var path = {
	'html': 'app/*.html',
	'partials': 'app/partials/**/*.html',
	'css': 'app/css/**/*.css',
	'scripts': 'app/js/**',
	'images': 'app/img/**/*'
};
var DST = 'dist'

// Include plugins
var plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var mainBowerFiles = require('main-bower-files');

// Scripts
gulp.task('scripts', function() {
	return gulp.src(mainBowerFiles().concat(path.scripts))
		.pipe(plugins.filter('*.js'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(DST + '/scripts'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(DST + '/scripts'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

// Html
gulp.task('html', function() {
	return gulp.src(path.html)
		.pipe(gulp.dest(DST))
		.pipe(notify({ message: 'Html task complete' }));
});

gulp.task('partials', function() {
	return gulp.src(path.partials)
		.pipe(gulp.dest(DST + '/partials'))
		.pipe(notify({ message: 'Partials task complete' }));
});

// Images
gulp.task('images', function() {
	return gulp.src(path.images)
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest(DST + '/img'))
	.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('css', function() {
	return gulp.src(path.css)
		.pipe(gulp.dest(DST + '/css'))
		.pipe(notify({ message: 'css task complete'}));
});

// Clean
gulp.task('clean', function() {
	return del([DST + '/scripts', DST + '/images']);
});

// Localhost
gulp.task('connect', function() {
	connect.server({
		root: 'dist',
	    port: '4000',
	    livereload: true
  	});
});

// Default task
gulp.task('default', ['watch', 'html', 'partials', 'scripts', 'css', 'images', 'clean'], function() {
	gulp.start('connect');
});

// Watch
gulp.task('watch', function() {
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
