var gulp = require('gulp'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    pxtorem = require('postcss-pxtorem'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss');
var onError      = function(error) {
    notify.onError({
        title: 'Error!',
        message: '<%= error.message %>'
    })(error);

    this.emit('end');
};
var onComplete   = {
    title: 'Complete!',
    message: '<%= file.relative %>',
    onLast: true
};
var paths = {
    sass: ['sass/**/*.sass'],
};

gulp.task('css', function(){
    var processors = [
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        pxtorem({
            prop_white_list: []
        })
    ];
    return gulp.src(paths.sass)
        .pipe(sass()) // Using gulp-sass
        .pipe(postcss(processors))
        .pipe(gulp.dest('css'))
        .pipe(notify(onComplete));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['css']);
});

gulp.task('default', ['watch']);