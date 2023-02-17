#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .argument('<filepath1>', 'the first path to compare')
  .argument('<filepath2>', 'the second path to compare')
  .option('-f, --format <type>', 'format difference', 'stylish')
  .action((filepath1, filepath2, options) => {
    const formatName = options.format;
    const diff = genDiff(filepath1, filepath2, formatName);
    console.log(diff);
  })
  .parse();
