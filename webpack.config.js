var path = require('path');
var settings = require('./gulp/tasks/settings');
	
module.exports = {
	entry : {
		App : settings.fileLocation + "scripts/App.js"
	},

	output : {
		path     : path.resolve(__dirname, './app/temp/scripts'),
		filename : "[name].js"
	},

	module : {
		rules : [
			{
				test    : "/\.js&/",
        exclude : /node_modules/,
        use     : {
          loader  : 'babel-loader',
          options : {
            presets : [ '@babel/preset-env']
          }
        }
			}
		]
	},
	mode:'development'
}