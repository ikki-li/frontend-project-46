#!/usr/bin/env node
import { program } from 'commander';
import runDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version number')
  .argument('<filepath1>', 'the first path to compare')
  .argument('<filepath2>', 'the second path to compare')
  .option('-f, --format <type>', 'format difference', 'stylish')
  .action((filepath1, filepath2, options) => {
    const formatName = options.format;
    runDiff(filepath1, filepath2, formatName);
  });

program.parse();
