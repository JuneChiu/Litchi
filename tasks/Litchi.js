/*
 * grunt-Litchi
 * 
 *
 * Copyright (c) 2014 chiu
 * Licensed under the MIT license.
 */

'use strict';

var less = require('less');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('Litchi', 'Tool of Converting Html files to AMD module', function() {

        // 异步任务
        var done = this.async();

        var compress_source_code = function(code){
            return code.replace(/'/g, "\\'")
                        .replace(/"/g, '\\"')
                        .replace(/[\n\r]/g, '')
                        .replace(/>[\s]+</g, '><')
                        .replace(/\}\}[\s]+\{\{/g, '}}{{')
                        .replace(/>[\s]+\{\{/g, '>{{')
                        .replace(/\}\}[\s]+</g, '}}<');
        };

        // 定义AMD模块输出模版
        var amd_module_tmpl = 'define(function(require, exports, module){module.exports = \'$replace$\'})';

        var done_process = function(f, code){

            code = compress_source_code(code);

            grunt.file.write(f.dest, amd_module_tmpl.replace('$replace$', code));

            grunt.log.writeln('File "' + f.dest + '" created.');

            done();
        };

    
        this.files.forEach(function(f) {

            f.src.filter(function(filepath) {

                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }
                else {
                    return true;
                }
            }).map(function(filepath) {

                // 读取文件源码
                var source_code = grunt.file.read(filepath);

                // 首先对文档去除换行
                source_code = source_code.replace(/[\n\r]/g, '');

                // 检查是否含有样式标签，使用Less编译器进行处理
                var style = /<style>(.+)<\/style>/.exec(source_code);

                if (style) {
                    less.render(style[1], function(e, css_code) {
                        if (!e) {
                            source_code = source_code.replace(style[0], '<style>' + css_code + '</style>');

                            done_process(f, source_code);
                        }
                        else{
                            grunt.log.warn('Less ' + e);
                        }
                    });
                }
                else{
                    done_process(f, source_code);
                }

            });
        });
    });

};