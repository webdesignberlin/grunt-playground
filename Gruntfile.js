'use strict';

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		clean: {
			dist: {
		        files: [{
		          dot: true,
		          src: [
		            'dist',
		            '.tmp'
		          ]
		        }]
		    },
		    init: {
		    	files: [{
		          dot: true,
		          src: [
		            'app',
		            '.git',
		            '.tmp',
		            'README.md'
		          ]
		        }]
		    }
		},
		shell:{
			gitInit: {
				command: ('git init')
			},
			gitAddAll: {
				command: ('git add --all')
			},
			gitCommit: {
				command: ('git commit -m "initial commit"')
			},
			gitClone: {
				command: ('git clone https://github.com/lwndev/jira-vagrant-install.git'),
				options: {
		            execOptions: {
		            	cwd: '.tmp'
		            }
		        }
			}
		}
	});

	grunt.registerTask('default',[
		
	]);

	grunt.registerTask('init','create project directories', function(){

		var alreadyInitialized = grunt.file.isDir('.git');

		if(alreadyInitialized === false){
			// create project directories
			grunt.file.mkdir('app/assets');
			grunt.file.mkdir('app/assets/js');
			grunt.file.mkdir('app/assets/css');
			grunt.file.mkdir('app/assets/video');
			grunt.file.mkdir('app/assets/pdf');
			grunt.file.write('app/assets/js/main.js', '{"contents":"stuff"}');
			grunt.file.write('README.md', 'Grunt Playground\n=========\n## About\nA project for learning grunt');

			// create .gitignore
			grunt.file.write('.gitignore', 'node_modules\nbuild\ndist\n.tmp');

			// initialize a git repo, add all relevant files and create a new project
			grunt.task.run("shell:gitInit");
			grunt.task.run("shell:gitAddAll");
			grunt.task.run("shell:gitCommit");
		}else{
			grunt.log.writeln('project already initialized');
		}
	});

	grunt.registerTask('clone','clone an existing repo',function(){
		grunt.file.mkdir('.tmp');
		grunt.task.run('shell:gitFork');
	});
};