'use strict';

var gulp = require('gulp');
var config = require('./gulp/config');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var notify = require('gulp-notify');
var browserify = require('gulp-browserify');

// Compress and combine JS files
gulp.task('js', function() {

	return gulp.src(config.js.src)
		.pipe(plumber({
		    errorHandler: config.error
		}))
		.pipe(uglify())
		.pipe(rename(config.js.destFile))
		.pipe(gulp.dest(config.base + config.js.folder))

});

// Compress Css
gulp.task('sass', function() {

	return gulp.src(config.sass.src)
		.pipe(plumber({
		    errorHandler: config.error
		}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({

			browsers: ['> 1%', 'last 2 versions'],
			cascade: false

		}))
		.pipe(rename(config.sass.destFile))
		.pipe(gulp.dest(config.base + config.sass.folder))

});

// module.exports
gulp.task('browserify', function() {
   	
  	return gulp.src(config.js.src)
  		.pipe(plumber({
            errorHandler: config.error
        }))
       	.pipe(browserify({
         	insertGlobals : false
       	}))
        .pipe(uglify())
        .pipe(rename(config.js.destFile))
       	.pipe(gulp.dest(config.base + config.js.folder));

});

// Static server
gulp.task('browser-sync', function() {
   
    browserSync.init({
        proxy: {
 	   		target: "http://local.wedl.nl",
    		ws: true
		}
    });

});

// Watch task
gulp.task('watch', function() {

	gulp.watch([config.sass.watch], ['sass', reload]);
	gulp.watch(config.js.watch, ['browserify', reload]);

});

// Server task
gulp.task('server', function() {

	return runSequence(
		['sass'],
		'browserify',
		'browser-sync',
		'watch'
	);

});


