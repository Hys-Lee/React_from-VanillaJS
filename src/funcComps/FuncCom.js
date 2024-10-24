import MyChild from './MyChild';
import Component from '../core/Component';
import { useState } from '../core/MyReact';

export default function FuncCom() {
  const [state, setState] = useState(456);

  console.log(`여긴 루튼데${state}`);
  return `<div><p>함수형</p>${(() => {
    const component = new Component(MyChild);
    return component.render();

    // return render();
  })()}</div>`;
}
