// import Component from './core/Component.js';
// import Items from './components/Items.js';
// import ItemAppender from './components/ItemAppender.js';

// export default class App extends Component {
//   setup() {
//     this.state = {
//       isFilter: 0,
//       items: [
//         {
//           seq: 1,
//           contents: 'item1',
//           active: false,
//         },
//       ],
//     };
//   }

//   template() {
//     return `
//         <header  data-component='item-appender'></header>
//         <main  data-component='items'></main>
//         <footer  data-component='item-filter'></footer>
//         <button data-component='add-button'>추가</button>
//     `;
//   }
//   mounted() {
//     const { addItem, filteredItems, toggleItem } = this;
//     const $itemAppender = this.$target.querySelector(
//       '[data-component="item-appender"]'
//     );
//     const $items = document.querySelector('[data-component="items"]');
//     const $itemFilter = document.querySelector(
//       '[data-component="item-filter"]'
//     );
//     new ItemAppender($itemAppender, addItem);
//     new Items($items, { filteredItems, toggleItem: toggleItem.bind(this) });
//   }

//   get filteredItems() {
//     const { isFilter, items } = this.state;
//     return items.filter(
//       ({ active }) =>
//         (isFilter === 1 && active) ||
//         (isFilter === 2 && !active) ||
//         isFilter === 0
//     );
//   }

//   addItem(content) {
//     console.log('addItem안에서 :', this);
//     const seq = this.state.items.length == 0 ? 0 : this.state.items[0].seq;

//     this.setState({
//       ...this.state,
//       items: [...this.state.items, { seq, content, active: false }],
//     });
//   }

//   toggleItem(seq) {
//     console.log(this.state, seq);
//     const items = [...this.state.items];
//     const index = items.findIndex((v) => v.seq === seq);
//     items[index].active = !items[index].active;
//     this.setState({ items });
//   }

//   filterItem(isFilter) {
//     this.setState({ isFilter });
//   }

//   setEvent() {
//     //기존
//     // this.$target.querySelector('button').addEventListener('click', () => {
//     //   const { items } = this.state;
//     //   this.setState({ items: [...items, `item${items.length + 1}`] });
//     // });

//     console.log(this);
//     // console.log(this.addItem);
//     requestAnimationFrame(() => {
//       const $addButton = this.$target.querySelector(
//         '[data-component="add-button"]'
//       );
//       // test
//       console.log('addButton: ', $addButton);
//       $addButton.removeEventListener('click', this.test);
//       $addButton.addEventListener('click', this.test);
//     });
//   }
//   test() {
//     this.innerHTML = '123';
//   }
// }

import Component from './core/Component.js';

export default class App extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
    `;
  }

  addItem = () => {
    const { items } = this.$state;
    this.setState({ items: [...items, `item${items.length + 1}`] });
  };

  setEvent() {
    // console.log(this.addItem, this);
    const $addButton = this.$target.querySelector('button');
    // console.log('ADDBUTTON: ', $addButton, this);
    $addButton.removeEventListener('click', this.addItem);
    $addButton.addEventListener('click', this.addItem);
  }
}
