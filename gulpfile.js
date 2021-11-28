var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

gulp.task("sass", function() {
    return gulp.src("src/assets/sass/app.scss")
               .pipe(sourcemaps.init())
               .pipe(sass())
               .pipe(
                   cleanCSS({
                       compatibility: 'ie8'
                   })
                )
               .pipe(sourcemaps.write())
               .pipe(gulp.dest('dist'))
               .pipe(browserSync.stream());
});

gulp.task("html", function() {
    return gulp.src('src/*.html')
               .pipe(gulp.dest('dist'));
});

gulp.task("fonts", function() {
    return gulp.src('src/assets/fonts/*')
            .pipe(gulp.dest('dist/fonts'));
})

gulp.task("images", function() {
    return gulp.src('src/assets/img/*')
               .pipe(imagemin())
               .pipe(gulp.dest('dist/img'));
})

gulp.task("watch", function() {

    browserSync.init({
        server: {
            baseDir: 'dist',
        }
    });

    gulp.watch("src/*.html", gulp.series("html")).on("change", browserSync.reload);
    gulp.watch("src/assets/fonts/*", gulp.series("fonts"));
    gulp.watch("src/assets/img/*", gulp.series("images"));
    gulp.watch("src/assets/sass/app.scss", gulp.series("sass"));
});



gulp.task("default", gulp.series("html", "images", "fonts", "sass", "watch"));


 
