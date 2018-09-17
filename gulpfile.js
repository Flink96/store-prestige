var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');

gulp.task('default', () =>
    gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

// Create Sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('src/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        imgPath: '../dist/sprite.png'
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('dist'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('dist'));

    return merge(imgStream, cssStream);
});

// All Watch
gulp.task('watch', ['sprite'], function () {
    gulp.watch('src/img/sprite/*.png', ['sprite']);
});

// Default Start
gulp.task('default', ['watch']);