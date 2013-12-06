#! /usr/bin/env node

if(!process.argv[2]){
    console.warn('jspect needs a target! eg: "jspect ./package.json"');
    return;
}

var program = require('commander'),
    path = require('path'),
    packageJson = require('./package.json'),
    Gedi = require('gedi'),
    object = require(path.resolve(process.argv[2])),
    gedi = new Gedi(object);

program
  .version(packageJson.version)
  .option('-p, --property [propertyPath]', 'Return the value of the object at this path.')
  .option('-e, --expression [expression]', 'Use a gedi/gel expression.')
  .parse(process.argv);

if(program.expression){
    console.log(gedi.get(program.expression));
}else if(program.property){
    console.log(gedi.get(gedi.paths.create(program.property.split('.'))));
}else{
    console.log(object);
}