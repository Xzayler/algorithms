import { createSignal } from 'solid-js';

import { encode, decode, EncodingData, DecodingData } from '~/algos/LZWEncoder';

import Container from '~/components/shared/Container';
import EncodingTable from '~/components/encoding/EncodingTable';
import { TextField } from '@kobalte/core/text-field';
import { Button } from '@kobalte/core/button';
import { Switch } from '@kobalte/core/switch';
import { delimiter } from 'vinxi/dist/types/lib/path';

export default function LZWEndoding() {
  const [tableData, setTableData] = createSignal<EncodingData>({});
  const [input, setInput] = createSignal<string>('');
  const [output, setOutput] = createSignal<string>('');
  const [inputError, setInputError] = createSignal<string>('');

  // false = encoding, true = decoding
  const [mode, setMode] = createSignal<boolean>(false);

  function parseDecodingInput(input: string): [string, DecodingData] {
    const separator = ' }\n';
    const indexOfFirstSeparator = input.indexOf(separator);
    if (indexOfFirstSeparator === -1) {
      setInputError('Invalid input format');
      return ['', []];
    }
    const codeStr: string = input.substring(2, indexOfFirstSeparator);
    const codes: string[] = codeStr.split(', ');
    console.log(codes);
    const decodingData: string[] = [];
    // const decodingData: string[] = new Array(codes.length);
    for (const val of codes) {
      const [str, index] = val.split(': ', 2);
      decodingData.splice(Number(index) - 1, 0, str);
    }

    const inputStr = input.substring(indexOfFirstSeparator + separator.length);
    console.log(inputStr);
    console.log(decodingData);

    return [inputStr, decodingData];
  }

  function handleSubmit() {
    if (mode()) {
      try {
        const [inputStr, inputCodes] = parseDecodingInput(input());
        const { decodedStr, table } = decode(inputStr, inputCodes);
        setTableData(table);
        setOutput(decodedStr);
      } catch (e) {
        console.log((e as Error).message);
      }
    } else {
      const { codedStr, table } = encode(input());
      setTableData(table);
      setOutput(codedStr);
    }
  }

  const data: EncodingData = {};
  return (
    <main class="h-dvh flex items-center">
      <Container>
        <div class="grid grid-cols-[fit-content(14rem),1fr] grid-rows-2 gap-3">
          <div class=" row-span-2 min-w-[7.5rem]">
            <EncodingTable data={tableData()} />
          </div>

          <div class="min-w-0 flex flex-col gap-3">
            <div class="min-w-20 grow">
              <TextField
                value={input()}
                onChange={setInput}
                class="flex flex-col h-full w-full"
              >
                <TextField.Label>
                  {'Insert text to ' + (mode() ? 'Decode' : 'Encode')}
                </TextField.Label>
                <TextField.TextArea class="p-1 grow border border-ui rounded-md text-foreground bg-background resize-none scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-ui scrollbar-track-transparent" />
              </TextField>
            </div>

            <div class="flex items-center gap-2 flex-wrap">
              <Switch
                class="flex flex-col items-center peer"
                onChange={(isChecked: boolean) => {
                  setMode(isChecked);
                  setInput(output());
                  setOutput('');
                }}
              >
                <Switch.Label>Encode/Decode</Switch.Label>
                <Switch.Input />
                <Switch.Control class="h-6 w-11 p-1 rounded-full flex items-center bg-sky-700 data-[checked]:bg-amber-700">
                  <Switch.Thumb class="h-full aspect-square rounded-full bg-white data-[checked]:translate-x-[calc(100%+4px)] transition-transform" />
                </Switch.Control>
              </Switch>
              <Button
                onClick={handleSubmit}
                class="w-24 font-bold text-lg py-2 px-3 rounded-xl transition-opacity bg-sky-700 peer-data-[checked]:bg-amber-700 hover:!bg-opacity-70 "
              >
                {mode() ? 'Decode' : 'Encode'}
              </Button>
            </div>
          </div>

          <div class="min-w-0">
            <TextField value={output()} class="flex flex-col h-full">
              <TextField.Label>Output</TextField.Label>
              <TextField.TextArea class="p-1 grow border border-ui rounded-md text-foreground bg-background resize-none scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-ui scrollbar-track-transparent" />
            </TextField>
          </div>
        </div>
      </Container>
    </main>
  );
}
