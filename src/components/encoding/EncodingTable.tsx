import { For } from 'solid-js';
import type { EncodingData } from '~/algos/LZWEncoder';
import EncodingTableRow from './EncodingTableRow';

/**
 * A Table element which simply represents the contents of a js Object as key-value pairs,
 * where the key is a string and the value is a number
 * @returns
 */
export default function EncodingTable(props: { data: EncodingData }) {
  return (
    <div class="w-max mx-auto h-[80dvh] overflow-y-auto border border-ui scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-ui scrollbar-track-transparent ">
      <table class="bg-highlight border-separate border-spacing-0 gap-0 h-full">
        <thead class="sticky top-0 bg-highlightextra ">
          <tr>
            <th class="border border-ui px-2 py-1">String</th>
            <th class="border border-ui px-2 py-1">Code</th>
          </tr>
        </thead>
        <tbody class="max-h-[200px] h-[200px] overflow-hidden">
          <For each={Object.entries(props.data)}>
            {(item) => {
              return EncodingTableRow(item);
            }}
          </For>
        </tbody>
      </table>
    </div>
  );
}
