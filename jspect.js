var program = require('commander'),
    packageJson = require('./package.json'),
    Gedi = require('gedi'),
    object = require(process.argv[2]),
    gedi = new Gedi(object);

program
  .version(packageJson.version)
  .option('-p, --property [propertyPath]', 'Return the value of the object at this path.')
  .option('-e, --expression [expression]', 'Use a gedi/gel expression.')
  .parse(process.argv);

if(program.property){
    var gedi = new Gedi(object);
    console.log(gedi.get(gedi.paths.create(program.property.split('.'))));
}else{
    console.log(object);
}