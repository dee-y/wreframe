/* 
 * Build Javascript for Prod
 */


var buildify =require('buildify');


buildify()
        .load('../modules/main.js')
        .concat(['../modules/drawArea/draw-resize.js'])
        .uglify()
        .save('../lib/js/app.min.js');