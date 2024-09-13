export default function EncodingTableRow(props: [string, number]) {
  return (
    <tr>
      <td class="border border-ui text-center w-16 max-w-16 break-words overflow-auto">
        {props[0]}
      </td>
      <td class="border border-ui text-center w-12 max-w-12 break-words overflow-auto ">
        {props[1]}
      </td>
    </tr>
  );
}
