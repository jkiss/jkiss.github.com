/* 
* @Author: apple
* @Date:   2015-01-04 15:20:23
* @Last Modified by:   apple
* @Last Modified time: 2015-01-06 20:01:40
*/

'use strict';
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');

gulp.task('default', function(){
    console.log('This is a default task...');
});

gulp.task('scripts', function(){
	return gulp.src('scripts/index.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({message: 'Script compress complete!'}));
});




