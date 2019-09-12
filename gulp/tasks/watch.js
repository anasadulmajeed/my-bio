var gulp 		    = require('gulp'),
    settings    = require('./settings'),
	  watch 		  = require('gulp-watch'),
	  browsersync = require('browser-sync').create();

gulp.task('watch', function() {
	browsersync.init({
    tunnel: true,
      server : {
        notify:false,
        baseDir : "app", 
      }
  });


  gulp.watch('./app/index.html').on('change', 
      browsersync.reload
  );


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




