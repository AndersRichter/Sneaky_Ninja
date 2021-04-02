/* Дана строка, состоящая из букв A-Z:
 * "AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBB"
 * Нужно написать функцию RLE, которая на выходе даст строку вида:
 * "A4B3C2XYZD4E3F3A6B27"
 *
 * Пояснение:
 * 1. если символ встречается 1 раз, он остается без изменений
 * 2. если символ повторяется более 1 раза, к нему добавляется количество повторений
 */

const { performance } = require('perf_hooks');

const TEST_STRING = 'AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBB';
const RESULT_STRING = 'A4B3C2XYZD4E3F3A6B27';
const TIMES_COUNT = 10000;

const test = (func, name) => console.log(name, RESULT_STRING === func(TEST_STRING), timeTest(func, name));

const timeTest = func => {
  const t0 = performance.now();

  for (let i = 0; i < TIMES_COUNT; i++) {
    func(TEST_STRING);
  }

  const t1 = performance.now();
  const averageTime = (t1 - t0) / TIMES_COUNT;

  return `Average time: ${averageTime.toFixed(4)}`;
};

// Мое первое решение
const RLE1Encode = (str) => {
  const resultArray = [];
  let resultArrayIndex = 0;

  for (let i = 0; i < str.length; i++) {
    const letter = str[i];

    // если такой буквы еще нет в результате, добавляем
    if (!resultArray[resultArrayIndex]) {
      resultArray[resultArrayIndex] = letter;

    // если буква равна текущей букве, то в следующей ячеке суммируем число букв
    } else if (resultArray[resultArrayIndex] === letter) {
      resultArray[resultArrayIndex + 1] = (resultArray[resultArrayIndex + 1] || 1) + 1;

    // если это новая буква, то сдвигаем индекс на 2 (потому что в след ячейке количество текущей буквы)
    } else {
      resultArrayIndex += 2;
      resultArray[resultArrayIndex] = letter;
    }
  }

  return resultArray.join('');
};

// Более короткое и понятное решение
const RLE2Encode = (str) => {
  const encoding = [];
  let previous = str[0];
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] !== previous) {
      encoding.push(previous, count === 1 ? '' : count);
      count = 1;
      previous = str[i];
    } else {
      count++;
    }
  }

  encoding.push(previous, count);

  return encoding.join('');
};

// Решение через ругулярку
const RLEEncodeRegExp = (str) => {
  return str.replace(/([ \w])\1+/g, (group, chr) => chr + group.length);
};

test(RLE1Encode, 'RLE1Encode');
test(RLE2Encode, 'RLE2Encode');
test(RLEEncodeRegExp, 'RLEEncodeRegExp');
