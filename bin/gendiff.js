#!/usr/bin/env node
import { program } from 'commander';
import generateDiff from '../src/compare-json-files.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .argument('<path1>', 'the first path to compare')
  .argument('<path2>', 'the second path to compare')
  .action((path1, path2) => {
    generateDiff(path1, path2);
  });
program.parse();
