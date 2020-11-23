#!/usr/bin/env node
/* istanbul ignore file - covered by cli.test.js */
const process = global.process;
const packageJson = require('../../package.json');
const bootstrapCompiler = require('bootstrap-compiler/dist/bootstrap-compiler');
global.process = process;

const VERSION = 'Package: ' + packageJson.version + '\nBootstrap: ' + bootstrapCompiler.BOOTSTRAP_VERSION;

require('yargs/yargs')(process.argv.slice(2))
    .version(VERSION)
    .commandDir('commands')
    .demandCommand()
    .help()
    .argv;
