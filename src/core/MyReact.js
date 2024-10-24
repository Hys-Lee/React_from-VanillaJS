import renderDebounce from './renderDebounce';

function MyReact() {
  const options = {
    state: [],
    currentStateKey: 0,
    root: null,
    rootComponent: null,
  };
  const _render = renderDebounce(() => {
    if (!options.root || !options.rootComponent) return;
    // options.rootComponent.innerHTML = options.root; // 아니면 child로 잡아야 하나?
    options.root.innerHTML = options.rootComponent();
    options.currentStateKey = 0; // root에서 render하는거니까 0으로 초기화.
  });

  function render(root, rootComponent) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }
  function setState(newState) {
    options.state[options.currentStateKey] = newState;
    _render();
  }
  function useState(initState) {
    // 처음(state가 undeifefdf)일 때만 실행됨.
    console.log('useSTAte안에서 this: ', this);
    const { state, currentStateKey } = options; //readonly
    if (state.length === currentStateKey) {
      //   state = initState;
      state.push(initState);
    }
    options.currentStateKey += 1; // 이건 useState가 실행될 때 마다 실행되어야 함. 그래야 해당 useState에 맞는 state를 골라내지.
    return [state[currentStateKey], setState]; // useState가 처음이 아닐 때 실행되더라도 반환되는 setState는 동일한 함수임.
  }
  console.log('MyReact실행');
  return { useState, render };
}

export const { useState, render } = MyReact();
