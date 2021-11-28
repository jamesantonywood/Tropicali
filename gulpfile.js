const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));

const preCSS = require('precss');
const postCSS = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const ghpages = require('gh-pages');


// gulp.task('sass', () => {
//     return gulp.src('src/assets/sass/app.scss')
//                .pipe(sourcemaps.init())
//                .pipe(sass())
//                .pipe(
//                    cleanCSS({
//                        compatibility: 'ie8'
//                    })
//                 )
//                .pipe(sourcemaps.write())
//                .pipe(gulp.dest('dist'))
//                .pipe(browserSync.stream());
// });

gulp.task('css', () => {
    return gulp.src([
        'src/assets/css/reset.css',
        'src/assets/css/typography.css',
        'src/assets/css/app.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(postCSS([
        preCSS(),
        require("autoprefixer"),
        require("postcss-preset-env")({
            stage: 1,
            browsers: ["IE 11", "last 2 versions"]
        }),

    ]))
    .pipe(concat('app.css'))
    .pipe(
        cleanCSS({
            compatibility: 'ie8'
        })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});


gulp.task('html', () => {
    return gulp.src('src/*.html')
               .pipe(gulp.dest('dist'));
});

gulp.task('fonts', () => {
    return gulp.src('src/assets/fonts/*')
            .pipe(gulp.dest('dist/fonts'));
})

gulp.task('images', () => {
    return gulp.src('src/assets/img/*')
               .pipe(imagemin())
               .pipe(gulp.dest('dist/img'));
})

gulp.task('watch', () => {

    browserSync.init({
        server: {
            baseDir: 'dist',
        }
    });

    gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/assets/fonts/*', gulp.series('fonts'));
    gulp.watch('src/assets/img/*', gulp.series('images'));
    gulp.watch('src/assets/css/*', gulp.series('css'));
});


gulp.task('deploy', (done) => {
    ghpages.publish('dist');
    done();
})

gulp.task('default', gulp.series('html', 'images', 'fonts', 'css', 'watch'));


 
