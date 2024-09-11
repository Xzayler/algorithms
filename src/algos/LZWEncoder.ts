export type EncodingData = {
  [key: string]: number;
};

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

  // Keep track of number of strings in the table to assign incremental ID values.
  let tableLength: number = Object.keys(table).length;

  const codes: number[] = [];

  const l = string.length;
  let i = 0;

  while (i < l) {
    let currStr = string.charAt(i);
    let nextStr = currStr + string.charAt(++i);

    // If the nextStr substring has already been assigned a code, use that as the new base
    while (i < l && table[nextStr] !== undefined) {
      currStr = nextStr;
      nextStr = currStr + string.charAt(++i);
    }
    codes.push(table[currStr]);
    // Only add the new substring to the table if i-th index exists in string.
    if (i !== l) {
      table[nextStr] = ++tableLength;
    }
  }

  // Build the output string from initialTable and the codes
  let codedStr = '{ ';
  for (let [key, val] of Object.entries(initialTable)) {
    codedStr += `${key}: ${val}, `;
  }
  codedStr = codedStr.slice(0, -2);
  codedStr += ' }\n';
  codedStr += String(codes);

  return { codedStr, table };
}
