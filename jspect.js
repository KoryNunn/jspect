#! /usr/bin/env node

function runWith(object, code){
    return eval(code.toString());
}

function jspect(){

    var program = require('commander'),
        path = require('path'),
        packageJson = require('./package.json'),
        Gedi = require('gedi'),
        objectPath = process.argv[2],
        object,
        gedi;

    if(objectPath && objectPath.indexOf('-') !== 0){
        object = require(path.resolve(objectPath)),
        gedi = new Gedi(object);
    }


    program
      .version(packageJson.version)
      .option('-p, --property [propertyPath]', 'Return the value of the object at this path.')
      .option('-e, --expression [expression]', 'Use a gedi/gel expression.')
      .option('-j, --javascript [javascript]', 'Pretty much just eval')
      .parse(process.argv);

    if(!object){
        console.warn('jspect needs a target file to inspect, eg: jspect ./package.json');
        return;
    }

    if(program.expression){
        console.log(gedi.get(program.expression));
    }else if(program.property){
        console.log(gedi.get(gedi.paths.create(program.property.split('.'))));
    }else if(program.javascript){
        console.log(runWith(object, program.javascript));
    }else{
        console.log(object);
    }
}

jspect();