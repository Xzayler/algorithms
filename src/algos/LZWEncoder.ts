export type EncodingData = {
  [key: string]: number;
};

export type DecodingData = string[];

/**
 * Will create an object with all the characters as keys having been assigned an incremental id
 * @param {string} string The message to be encoded
 * @returns {EncodingData} The encoding table object with each character as a key with a number assigned to it
 */
function initialiseEncodingTable(string: string) {
  const table: EncodingData = {};
  let tableLength = 0;

  for (let char of string) {
    if (table[char] === undefined) {
      tableLength++;
      table[char] = tableLength;
    }
  }

  return table;
}

/**
 * Will encode a string by using the LZW encoding algorithm
 * @param {string} string  The message to be encoded
 * @returns {{codedStr: string; table: EncodingData;}} codedStr is the encoded output, with the initial Table needed to decode the encoded message, followed by the actual encoded message in a new line. While table is the full table created during the encoding process
 */
export function encode(string: string): {
  codedStr: string;
  table: EncodingData;
} {
  const initialTable: EncodingData = initialiseEncodingTable(string);
  const table: EncodingData = structuredClone(initialTable);

  let tableLength: number = Object.keys(table).length;

  const codes: number[] = [];

  const l = string.length;
  let i = 0;

  while (i < l) {
    let currStr = string.charAt(i);
    let nextStr = currStr + string.charAt(++i);

    while (i < l && table[nextStr] !== undefined) {
      currStr = nextStr;
      nextStr = currStr + string.charAt(++i);
    }

    codes.push(table[currStr]);
    if (i !== l) {
      table[nextStr] = ++tableLength;
    }
  }

  let codedStr = '{ ';
  for (let [key, val] of Object.entries(initialTable)) {
    codedStr += `${key}: ${val}, `;
  }
  codedStr = codedStr.slice(0, -2);
  codedStr += ' }\n';
  codedStr += String(codes);

  return { codedStr, table };
}

/**
 * Decodes a message encoded with the LZW algorithm, given it is provided a correct decoding table
 * @param {string} string The coded message to decode. This should be a list of numbers separated by commas.
 * @param {DecodingData} arr An array containing the initial coded strings for which
 * @returns {{decodedStr: string, table: EncodingData}} decodedStr is the decoded output. table is the full table created during the decoding process
 */
export function decode(
  string: string,
  arr: DecodingData,
): { decodedStr: string; table: EncodingData } {
  if (string.length === 0) throw new Error('Input string is empty');
  if (arr.length === 0) throw new Error('Input decoding table is empty');

  const codeArray = string.split(',');

  if (Number(codeArray[0]) >= arr.length) {
    throw new Error("First code isn't in the provided table");
  }

  let currStr: string = arr[Number(codeArray[0]) - 1];
  const decodedStrs: string[] = [currStr];
  let prevStr: string = currStr;

  const l = codeArray.length;
  for (let i = 1; i < l; i++) {
    const code = Number(codeArray[i]);
    if (code <= arr.length) {
      currStr = arr[code - 1];
      const newStr = prevStr.concat(currStr.charAt(0));
      arr.push(newStr);
    } else {
      const newStr = prevStr.concat(currStr.charAt(0));
      arr.push(newStr);
      currStr = arr[code - 1];
    }
    console.log(arr);
    decodedStrs.push(currStr);
    prevStr = currStr;
  }

  const decodingTable = arrayToTable(arr);

  return { decodedStr: decodedStrs.join(''), table: decodingTable };
}

function arrayToTable(arr: DecodingData): EncodingData {
  const table: EncodingData = {};
  arr.forEach((str, i) => {
    table[str] = i + 1;
  });
  return table;
}
