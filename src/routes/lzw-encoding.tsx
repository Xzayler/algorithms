import { createSignal } from 'solid-js';

import { encode, EncodingData } from '~/algos/LWZEncoder';

import Container from '~/components/shared/Container';
import EncodingTable from '~/components/encoding/EncodingTable';
import { TextField } from '@kobalte/core/text-field';
import { Button } from '@kobalte/core/button';
import { Switch } from '@kobalte/core/switch';

export default function LZWEndoding() {
  const [tableData, setTableData] = createSignal<EncodingData>({});
  const [input, setInput] = createSignal<string>('');
  const [output, setOutput] = createSignal<string>('');

  // false = encoding, true = decoding
  const [mode, setMode] = createSignal<boolean>(false);

  function handleSubmit() {
    if (mode()) {
      setOutput('decoded message');
    } else {
      setOutput('encoded message');
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
                <TextField.Label>Insert text to Encode</TextField.Label>
                <TextField.TextArea class="grow border border-ui rounded-md text-foreground bg-background resize-none" />
              </TextField>
            </div>

            <div class="flex items-center gap-2">
              <Switch
                class="flex flex-col items-center peer"
                onChange={setMode}
              >
                <Switch.Label>Encode/Decode</Switch.Label>
                <Switch.Input />
                <Switch.Control class="h-6 w-11 p-1 rounded-full flex items-center bg-sky-700 data-[checked]:bg-amber-700">
                  <Switch.Thumb class="h-full aspect-square rounded-full bg-white data-[checked]:translate-x-[calc(100%+4px)] transition-transform" />
                </Switch.Control>
              </Switch>
              <Button
                onClick={handleSubmit}
                class=" font-bold text-lg py-2 px-3 rounded-xl hover:bg-opacity-70 transition-opacity bg-sky-700 peer-data-[checked]:bg-amber-700"
              >
                {mode() ? 'Decode' : 'Encode'}
              </Button>
            </div>
          </div>

          <div class="min-w-0">
            <TextField value={output()} class="flex flex-col h-full">
              <TextField.Label>Output</TextField.Label>
              <TextField.TextArea class="grow border border-ui rounded-md text-foreground bg-background resize-none" />
            </TextField>
          </div>
        </div>
      </Container>
    </main>
  );
}
