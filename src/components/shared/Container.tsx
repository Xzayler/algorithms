import { JSXElement } from 'solid-js';

export default function Container(props: { children: JSXElement }) {
  return (
    <div class="max-w-screen-md w-full xs:w-11/12 sm:w-10/12 md:w-full min-w-min px-4 mx-auto h-full max-h-full">
      {props.children}
    </div>
  );
}
