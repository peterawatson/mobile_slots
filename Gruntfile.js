module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
         
    jshint: {
      dev: { 
		  src: ['dev/js/*.js']
		  }
    },

        concat: {
            // 2. Configuration for concatinating files goes here.
		          options:{
		        separator: ';'
		      },
			    js: {
			       // src: ['dev/js/*.js'],
			        src: ['bootstrap/dist/js/bootstrap.min.js','dev/js/ie10-viewport-bug-workaround.js','dev/js/uwd.js'],
			        dest: 'dev/build1js/production.js'
			    },
			     css: {
			        //src: ['dev/css/*.css'],
			        src: ['bootstrap/dist/css/bootstrap.min.css','dev/css/sa.css'],
			        dest: 'dev/build1css/production.css'
			    }

        },
        
	        uglify: {
	        	/*
	        	 * test this part and investigate the options
	        	 */
	        	options:{  
	        		mangle:true,
	        	},
		    build: {
		        src: 'dev/build1js/production.js',
		        dest: 'js/build/production.min.js'
	    	}
		},
		 cssmin: {
      css: {
        src: 'dev/build1css/production.css',
        dest:'css/build/production.min.css' // 2 levels to keep urls ../ same
      }
    },
         watch: {// added to watch for changes and process
    css: {
        files: ['dev/css/sa.css'],
        tasks: ['concat','cssmin']
		},
	js: {
		files: ['dev/js/uwd.js'],
		tasks: ['concat','uglify']
	   }
	},


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat','uglify','cssmin']);

};

/**
 *  Setting up grunt in local folder ready for code above
 * cd myfolder
> npm init
> npm install -g grunt-cli
> npm install grunt --save-dev
> npm install grunt-contrib-concat --save-dev
> npm install grunt-contrib-uglify --save-dev
> npm install grunt-contrib-cssmin --save-dev 
* 
* http://12devsofxmas.co.uk/2014/01/day-10-maintaining-a-better-workflow-with-grunt/http://12devsofxmas.co.uk/2014/01/day-10-maintaining-a-better-workflow-with-grunt/
 */
