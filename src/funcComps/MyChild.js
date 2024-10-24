import { useState, render } from '../core/MyReact';

export default function MyChild() {
  const [state, setState] = useState(['state1', 'state2']);
  console.log('MyChild안에서 this: ', this);
  window.buttonClick = () => {
    setState([...state, `state${state.length + 1}`]);
  };
  console.log('MyChild리렌더');
  return `
    <div>
      <ul>${state
        .map((stateVal) => `<li key=${stateVal}>${stateVal}</li>`)
        .join('')}
      </ul>
      <button onclick="buttonClick()"
      >
      추가
      </button>
    </div>
      `;
}
