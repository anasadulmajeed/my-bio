var gulp 		  = require('gulp'),
    settings     = require('./settings'),
	  watch 		  = require('gulp-watch'),
	  browsersync  = require('browser-sync').create();

gulp.task('watch', function() {
	browsersync.init({
      server : {
         baseDir : "app", 
      }
   });


   gulp.watch(settings.fileLocation + 'index.html', function() {
      browsersync.reload();
   });


   gulp.watch(settings.fileLocation + 'styles/**/*.css', gulp.parallel('waitForStyles'));
   gulp.watch(settings.fileLocation + 'scripts/**/*.js', gulp.parallel('waitForScripts'));
   
});


gulp.task('waitForStyles', gulp.series('styles', function() {
   return gulp.src(settings.generatedFile + 'styles/styles.css')
    .pipe(browsersync.stream());

}));

gulp.task('waitForScripts', gulp.series('scripts', function(cb){
   browsersync.reload();
   cb();
}));




