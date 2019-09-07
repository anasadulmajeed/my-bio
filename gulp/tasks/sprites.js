var gulp 	    = require("gulp"),
	  svgSprite = require("gulp-svg-sprite"),
	  rename 	  = require("gulp-rename"),
    del       = require("del"),
    svg2png   = require("gulp-svg2png"),
    settings  = require("./settings")
  ;


var config = {
  mode : {
    shape : {
      spacing : {
        padding : 1,
      }
    }
    css : {
      variables : {
        replaceSvgWithPng : function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png')
          }
        }
      },
      sprite : 'sprite.svg',
      render : {
        css : {
          template : settings.gulpLocation + 'templates/sprite.css'
        }
      }
    }
  }

}  

gulp.task('beginClean', function() {
  return gulp.series(del(settings.generatedFile + 'sprite/', settings.fileLocation + 'images/sprites');
});

gulp.task('createSprite',gulp.series('beginClean', function() {
  return gulp.src(settings.fileLocation + 'images/icons')
    .pipe(svgSprite(config))
}));

gulp.task()
