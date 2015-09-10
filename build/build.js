/**
 * Main build script for Beeper.
 * To run, navigate to the base project directory and run: node build/build.js
 */
(function(){
	'use strict';
	
	var UglifyJs2       = require('uglify-js'),
		Rjs             = require('requirejs'),
		AmdClean        = require('amdclean'),
		ClosureCompiler = require('closurecompiler'),
		exec            = require('child_process').exec,
		fs              = require('fs');
	
	var config = {
		rjs: {
			baseUrl: 'src/js',
			name: 'main',
			out: 'dist/b.notmin.js',
			
			optimize: 'none', // AMDclean won't work on minified files
			useStrict: true,
			removeCombined: true,
			
			// Do further processing after r.js has worked its magic
			onModuleBundleComplete: onRjsModuleBundleComplete
		},
		
		amdClean: {},
		
		uglifyJs2: {
			fileIn: 'dist/b.notmin.js',
			fileOut: 'dist/b.js',
			warnings: true,
		}
	};
	
	/**
	 * Additional build steps to run after r.js has optimised modules into one file.
	 */
	function onRjsModuleBundleComplete(data) {
		console.log('r.js optimisation complete.');
		
		var outputFile = data.path;
		
		// Remove AMD module definitions using AMDclean (https://github.com/gfranko/amdclean)
		// This way we don't need to include an AMD module loader in the finished game.
		console.log('Running AMDclean...');
		var cleanedCode = AmdClean.clean({
			'filePath': outputFile
		});
		fs.writeFileSync(outputFile, cleanedCode);  // Write to disk
		console.log('AMDclean complete.');
		
		// Minify resulting code with UglifyJS2 (https://github.com/mishoo/UglifyJS2)
		/*console.log('Uglifying code...');
		var uglifiedCode = UglifyJs2.minify(outputFile, config.uglifyJs2);
		fs.writeFileSync(config.uglifyJs2.fileOut, uglifiedCode.code);  // Write to disk
		console.log('Uglification complete.');*/
		
		// Minify JS with Closure Compiler
		console.log('Compiling with Closure Compiler...');
		ClosureCompiler.compile(
			[outputFile],
			{compilation_level: 'ADVANCED_OPTIMIZATIONS'},
			function(error, result){
				if (result){
					fs.writeFileSync('dist/b.js', result);
					if (error){
						console.warn(error);
					}
				} else {
					console.error(error);
				}
				
				console.log('Closure Compiler complete.');
				onClosureComplete();
			}
		);
	};
	
	function onClosureComplete(){
		// Optimise CSS with r.js
		console.log('Compiling/optimising SCSS...');
		exec('compass compile -c build/compass-config.rb -e production', onCompassComplete);
	};
	
	function onCompassComplete(error, stdOut, stdErr){
		console.log(stdOut.toString());
		if (error !== null){
			console.error(stdErr.toString());
		}
		console.log('SCSS compilation/optimisation complete.');
	};
	
	// Quick and dirty file copy
	function copyFile(src, dest){
		var data = fs.readFileSync(src);
		fs.writeFileSync(dest, data);
	}
	
	
	console.log('Starting build...');
	// Copy the main HTML file over
	copyFile('src/index.html', 'dist/index.html');
	// Kick it off with r.js
	console.log('Running r.js optimisations on JS...')
	Rjs.optimize(config.rjs);
})();