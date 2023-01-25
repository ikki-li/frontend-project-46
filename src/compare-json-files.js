import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const compare = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length === 0 && keys2.length === 0) {
        throw new Error("Files are empty!");
    }
    const commonKeys = _.union(keys1, keys2);
    const sortedCommonKeys = _.sortBy(commonKeys);
    const result = [];
    for (const key of sortedCommonKeys) {
        if (!Object.hasOwn(object1, key)) {
            result.push(['+', key, object2[key]]);
        }
        else if (!Object.hasOwn(object2, key)) {
            result.push(['-', key, object1[key]]);
        }
        else if (object1[key] === object2[key]) {
            result.push([' ', key, object1[key]]);
        }
        else if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key) && object1[key] !== object2[key])
        result.push(['-', key, object1[key]], ['+', key, object2[key]]);
    };
    return result;
};

const prepareOutput = (data) => {
    let result = '';
    for (const element of data) {
        result += ` ${element[0]} ${element[1]}: ${element[2]}\n`;
    }
    return `{\n${result}}`;
}

const getDiff = (path1, path2) => {
    const normalizedPath1 = path.resolve(path1);
    const normalizedPath2 = path.resolve(path2);
    if (!fs.existsSync(normalizedPath1) || !fs.existsSync(normalizedPath2)) {
        throw new Error("File doesn't exist");
    }
    if (!fs.lstatSync(normalizedPath1).isFile() || !fs.lstatSync(normalizedPath2).isFile()) {
        throw new Error("Is not a file in perfomed path");
    }
    const extension1 = path.extname(normalizedPath1);
    const extension2 = path.extname(normalizedPath2);
    let difference;
    if (extension1 === '.json' && extension2 === '.json') {
        const json1 = fs.readFileSync(normalizedPath1);
        const json2 = fs.readFileSync(normalizedPath2);
        const object1 = JSON.parse(json1);
        const object2 = JSON.parse(json2);
        difference = compare(object1, object2);
    }
    console.log(prepareOutput(difference));
};

export default getDiff;