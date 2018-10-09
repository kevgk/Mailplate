const gulp          = require('gulp');
const hb            = require('gulp-hb');
const rename        = require('gulp-rename');
const imagemin      = require('gulp-imagemin');
const mjml          = require('gulp-mjml2');
const inject        = require('gulp-inject');
const del           = require('del');
const marked        = require('marked');
const hbTrim        = require('handlebars-trim');
const stripIndent   = require('strip-indent');
const layouts       = require('handlebars-layouts');
const sass          = require('node-sass');

const handlebars = hb()
.data('./src/data/**/*.{js,json}')
.partials('./src/layouts/**/*.hbs')
.partials('./src/partials/**/*.hbs')
.helpers(layouts)
.helpers({
  t: hbTrim,
  md: options => marked(stripIndent(options.fn(this, {
    data: {}
  })))
});

gulp.task('compile', () => (
  gulp.src('./src/pages/**/*.hbs')
    .pipe(handlebars)
    .pipe(mjml({ minify: true, keepComments: false }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./dist'))
));

const compileSass = (filePath, file) => {
  if (file.contents.toString().length) {
    return sass.renderSync({data: file.contents.toString('utf8')}).css.toString();
  }
  else {
    return null;
  }
}
gulp.task('inject', () => {
  const injections = gulp.src('./src/sass/**/*.scss');
  return gulp.src('./dist/**/*.html')
    .pipe(inject(injections, {
        removeTags: true,
        transform: compileSass
      }
    ))
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', () => (
  gulp.src('./src/pages/**/*.{jpg,jpeg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist'))
));

gulp.task('clean', () => {
  return del('./dist/**/*');
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('compile'),
  'inject'
));