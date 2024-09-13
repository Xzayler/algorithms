export default function EncodingTableRow(props: [string, number]) {
  return (
    <tr>
      <td class="border border-ui text-center w-20 max-w-20 break-words overflow-auto">
        {props[0]}
      </td>
      <td class="border border-ui text-center">{props[1]}</td>
    </tr>
  );
}
