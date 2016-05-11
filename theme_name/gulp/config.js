'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = {

    build: './assets/',
    dist: './assets/',
    base: './assets/',
    taskPath: './gulp/tasks/',
    
    sass: {
        watch: ['assets/sass/**/*.scss'],
        src: ['./assets/sass/main.scss'],
        folder: 'sass/',
        destFile: 'style.min.css'
    },

    js: {
        watch: ['assets/js/**/*.js'],
        src: ['./assets/js/**/*.js'],
        folder: 'js/',
        destFile: 'main.min.js'
    },

    error: function(error) {

        $.notify.onError({
            title: 'Gulp',
            message: 'Error: <%= error.message %>'
        })(error);
        this.emit('end');

    }
};

module.exports = config;