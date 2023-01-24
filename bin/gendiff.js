#!/usr/bin/env node
import { program } from 'commander';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format');
program.parse();
const options = program.opts();
options.format
    .argument('<type>', 'format type');
program.parse();