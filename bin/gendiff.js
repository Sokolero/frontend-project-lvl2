#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('CLI to compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(gendiff(
      filepath1,
      filepath2,
      program.opts().format,
    ));
  });

program.parse();
