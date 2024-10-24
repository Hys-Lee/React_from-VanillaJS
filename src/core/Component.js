// import { updateElement } from './vdom';

// export default class Component {
//   $target;
//   state;
//   props;
//   constructor($target, props) {
//     this.$target = $target;
//     this.props = props;
//     this.setup();
//     // this.setEvent();
//     this.render();
//   }
//   render() {
//     // this.$target.innerHTML = this.template();
//     // this.mounted();

//     const newNode = this.$target.cloneNode(true);
//     newNode.innerHTML = this.template(); // 새로운 템플릿 넣기.

//     const oldChildNodes = [...this.$target.childNodes];
//     const newChildNodes = [...newNode.childNodes];
//     const maxIter = Math.max(oldChildNodes.length, newChildNodes.length);
//     for (let i = 0; i < maxIter; i++) {
//       updateElement(this.$target, newChildNodes[i], oldChildNodes[i]);
//     }

//     this.setEvent();
//     // requestAnimationFrame(() => {
//     //   this.setEvent();
//     //   console.log('component에서 this: ', this);
//     // });
//     this.mounted();
//   }
//   setup() {}
//   template() {
//     return ``;
//   }
//   setState(newState) {
//     this.state = {
//       ...this.state,
//       ...newState,
//     };
//     this.render();
//   }
//   setEvent() {}
//   addEvent(eventName, callback) {
//     this.$target.addEventListener(eventName, (event) => callback(event));
//   }
//   mounted() {}
// }

import { updateElement } from './vdom.js';

export default class Component {
  $target;
  $state;
  initTmp = () => {
    console.log('initTmp');
  };
  constructor(componentFunc) {
    // const componentDom = document.createElement('div');
    // componentDom.innerHTML = componentFunc();
    // this.$target = componentDom;
    this.$target = componentFunc.bind(this);
    this.setup();
    this.render();
  }
  // 원본 //
  // constructor($target) {
  //   this.$target = $target;
  //   this.setup();
  //   this.render();
  // }
  setup() {}
  template() {
    return '';
  }
  comTmp = () => {
    console.log(comTmp);
  };

  // 여기가 핵심이다.
  render() {
    // 원본 //
    // console.log(
    //   '얘는 왜 됨? 여기서 this도 프로토타입 아님?',
    //   this,
    //   this.$state,
    //   this.comTmp,
    //   this.initTmp
    // );
    const { $target } = this;

    // 기존 Node를 복제한 후에 새로운 템플릿을 채워넣는다.
    const newNode = $target.cloneNode(true);
    newNode.innerHTML = this.template();

    // DIFF알고리즘을 적용한다.
    const oldChildNodes = [...$target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      updateElement($target, newChildNodes[i], oldChildNodes[i]);
    }
    // 이벤트를 등록한다.
    requestAnimationFrame(() => this.setEvent());
  }

  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
