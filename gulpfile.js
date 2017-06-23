/**
 * Created by M.J on 2017/6/23.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
	less = require('gulp-less'),
	autoprefixer = require('autoprefixer'),
    minifyCss = require('gulp-minify-css'),
	postcss = require('gulp-postcss'),
	rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var dist = './dist/',
    src  = './src/';

/**
 * ��ղ���Ŀ¼
 */
gulp.task('clean', function(){
    return gulp.src(dist, {read:false })
               .pipe(clean());
});

/**
 * �ϲ�CSS
 */
gulp.task('css', ['clean'], function() {
    var css = [src + 'tooltips.less'];
	
    return gulp.src(css)
               .pipe(less().on('error', function (e) {
                    console.error(e.message);
                    this.emit('end');
               }))
               .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1', 'Explorer >= 9'])]))
               .pipe(gulp.dest(dist))
               .pipe(minifyCss({
                    keepBreaks: false, //�Ƿ�������
                    keepSpecialComments: '*' //������������ǰ׺
                }))
               .pipe(rename('tooltips.min.css'))
               .pipe(gulp.dest(dist));
});

/**
 * �ϲ�JS
 */
gulp.task('js', ['css'], function() {
    var js = [src + 'tooltips.js'];

    return gulp.src(js)
               .pipe(gulp.dest(dist))
			   .pipe(rename('tooltips.min.js'))
               .pipe(uglify({
                    output: {
                        comments: /^!/,
                    }
                }))
               .pipe(gulp.dest(dist));
});

/**
 * Copy Index
 */
gulp.task('index', ['js'], function() {
    return gulp.src(src + 'index.html')
        .pipe(gulp.dest(dist));
});

gulp.task('default', ['index']);