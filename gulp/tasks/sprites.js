var gulp      = require("gulp"),
    svgSprite = require("gulp-svg-sprite"),
    rename    = require("gulp-rename"),
    del       = require("del"),
    svg2png   = require("gulp-svg2png"),
    settings  = require("./settings");


var config = {
  shape : {
    spacing : {
      padding :1,
    }
  },
  mode : { 
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
gulp.task('beginClean1', function() {
  return del([settings.fileLocation + 'images/sprites'])
})
gulp.task('beginClean', function() {
  return del([settings.generatedFile + '/sprite'] )
})

gulp.task('createSprite', gulp.series('beginClean',function() {
  return gulp.src(settings.fileLocation + 'images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest(settings.generatedFile + 'sprite/'));
}));

gulp.task('createPngCopy', gulp.series('createSprite', function() {
  return gulp.src(settings.generatedFile + 'sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest(settings.generatedFile + 'sprite/css/'));
}));

gulp.task('copySpriteGraphic', gulp.series('createPngCopy', function() {
  return gulp.src(settings.generatedFile + 'sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest(settings.fileLocation + 'images/sprites'));
}));

gulp.task('copySpriteCss', gulp.series('createSprite', function() {
  return gulp.src(settings.generatedFile + 'sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest(settings.fileLocation + 'styles/modules'));
}));

gulp.task('endClean', gulp.series('copySpriteGraphic', 'copySpriteCss', function() {
  return del([settings.generatedFile + 'sprite']);
}));

gulp.task('icons', gulp.series( 'beginClean1', 'beginClean','createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCss', 'endClean'));