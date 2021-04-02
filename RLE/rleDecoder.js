/* Дана строка, состоящая из букв A-Z и цифр:
 * "A4B3C2XYZD4E3F3A6B27"
 * Нужно написать функцию RLE, которая на выходе даст строку вида:
 * "AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBB"
 *
 * Пояснение:
 * 1. если символ встречается 1 раз, он остается без изменений
 */

const { performance } = require('perf_hooks');

const RESULT_STRING = 'AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBB';
const TEST_STRING = 'A4B3C2XYZD4E3F3A6B27';
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
const RLE1Decode = str => {
  let resultString = '';
  let currentCount = '';
  let currentLetter = '';

  for (let i = 0; i < str.length; i++) {
    // если символ - число, то формируем текущее число
    if (!isNaN(str[i])) {
      currentCount = `${currentCount}${str[i]}`;

    // если не число, а буква, и есть сохраненная буква, то нужно повторить сохраненную и сохранить новую
    } else if (currentLetter) {
      resultString += currentLetter.repeat(+currentCount || 1);
      currentCount = '';
      currentLetter = str[i];
    } else {
      // если пока нет сохраненной, то сохраняем текущую букву
      currentLetter = str[i];
    }
  }

  resultString += currentLetter.repeat(+currentCount || 1);

  return resultString;
};

// Решение через регулярки
const RLEDecodeRegExp = str => {
  return str.replace(/([ \w])(\d+)/g, (_, chr, count) => chr.repeat(count));
};

test(RLE1Decode, 'RLE1Decode');
test(RLEDecodeRegExp, 'RLEDecodeRegExp');
