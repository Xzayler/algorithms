export default function EncodingTableRow(props: [string, number]) {
  return (
    <tr>
      <td class="border border-ui text-center">{props[0]}</td>
      <td class="border border-ui text-center">{props[1]}</td>
    </tr>
  );
}
