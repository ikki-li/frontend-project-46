# GenDiff

## The compare tool

[![Actions Status](https://github.com/ikki-li/frontend-project-46/workflows/Node-CI/badge.svg)](https://github.com/ikki-li/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/6ac4226b51369ea46644/maintainability)](https://codeclimate.com/github/ikki-li/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6ac4226b51369ea46644/test_coverage)](https://codeclimate.com/github/ikki-li/frontend-project-46/test_coverage)

### Description:

Command line utility to get differences between two YAML or JSON documents.

### Requirements:

Node.js ^14.0.0

### Install as package:

```
npm install @hexlet/code
```

### Usage as package:

```
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2, format);
console.log(diff);
```

### Install as application:

```
npm install gendiff
```
or with deps from package-lock.json:
```
npm ci gendiff
```

### Usage as application:

```
gendiff -f stylish data/file1.json data/file2.json
```

### GenDiff on Asciinema:

**Get differnece between two flat JSON files:**
[![Asciicast 558243](https://asciinema.org/a/558243.svg)](https://asciinema.org/a/558243)

**Get differnece between two nested JSON files:**
[![Asciicast 558244](https://asciinema.org/a/558244.svg)](https://asciinema.org/a/558244)

**Get difference between two nested YML files:**
[![Asciicast 558245](https://asciinema.org/a/558245.svg)](https://asciinema.org/a/558245)

**Get difference in plain format:**
[![Asciicast 558246](https://asciinema.org/a/558246.svg)](https://asciinema.org/a/558246)

**Get difference in json format:**
[![Asciicast 559036](https://asciinema.org/a/559036.svg)](https://asciinema.org/a/559036)


