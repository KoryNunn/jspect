# jspect

## installation

Install jspect globaly.

    npm i jspect -g

## Wat

jspect is an easy way to inspect JSON or .js files from the command line.

## Usage

Log out a json file.

    jspect ./package.json
    // will log the whole file

Log out a property on a json file.

    jspect ./package.json -p version
    // -> 0.0.4

Log out a deeper property

    jspect ./package.json -p dependencies.gedi
    // -> 0.12.1

Run up a module and print its module.exports:
(I'll use gedi-paths as an example)

    jspect ./paths.js
    // will log the whole exports

Log out a property on a module.

    jspect ./paths.js -p is
    // -> [Function]

Log out a deeper property

    jspect ./paths.js -p constants.separator
    // -> /

## MOAR POWER!

jspect uses gedi to parse expressions, so you can do some pretty cool things like...

Run up the module, and get the keys on a property:

    jspect ./paths.js -e "(keys [constants])"
    // ->   [ 'separator',
    //        'upALevel',
    //        'currentKey',
    //        'root',
    //        'start',
    //        'end',
    //        'wildcard' ]

Filter the keys where the key starts with s:

    jspect ./paths.js -e "(filter (keys [constants]) {key (== (slice 0 1 key) 's')})"
    // ->   [ 'separator', 'start' ]

Filter the keys where the key starts with s and add their lengths:

    jspect ./paths.js -e "(length (apply join (concat (array '') (filter (keys [constants]) {key (== (slice 0 1 key) 's')}))))"
    // ->   14

But that would be silly..