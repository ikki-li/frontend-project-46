#!/usr/bin/env node
import { program } from 'commander';
import runDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .argument('<path1>', 'the first path to compare')
  .argument('<path2>', 'the second path to compare')
  .action((filepath1, filepath2) => {
    runDiff(filepath1, filepath2);
  });
program.parse();
