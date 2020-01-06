'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
	//https://github.com/gruntjs/grunt-contrib-connect
		connect: {
			options: {
				port: 8080,
				hostname: '*'
			},
			src: {},
			dist: {}
		},
		//https://github.com/SAP/grunt-openui5#openui5_connect
		openui5_connect: {
			options: {
				resources: [
					'../../sapui5-sdk-1.60.18/resources',
				],
				testresources: [
					'../../sapui5-sdk-1.60.18/test-resources',
				]
			},
			src: {
				options: {
					appresources: 'webapp'
				}
			},
			dist: {
				options: {
					appresources: 'dist'
				}
			}
		},
		//https://github.com/SAP/grunt-openui5#openui5_preload
		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: 'webapp',						
						prefix: 'ricky/test/ui5/demo1',
						src: [
							'**/*.js',
							'**/*.fragment.html',
							'**/*.fragment.json',
							'**/*.fragment.xml',
							'**/*.view.html',
							'**/*.view.json',
							'**/*.view.xml',
							'**/*.properties',
							'manifest.json',
							'!test/**'
						]
					},
					dest: 'dist'
				},
				components: true
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-openui5');

	// Server task
	grunt.registerTask('serve', function(target) {
		grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
	});

	// Default task
	grunt.registerTask('default', ['serve']);
};
