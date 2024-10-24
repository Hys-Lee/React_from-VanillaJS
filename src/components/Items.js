import Component from '../core/Component.js';

export default class Items extends Component {
  template() {
    const { filteredItems } = this.props;
    return `
        <ul>
            ${filteredItems
              .map(
                ({ contents, active, seq }) =>
                  `<li data-seq="${seq}">
                  ${contents}
                  <button
                    class="togleBtn"
                    style="color:${active ? '#09F' : '#F09'}"
                  >
                    ${active ? '활성' : '비활성'}
                  </button>
                </li>
              `
              )
              .join('')}
        </ul>
    `;
  }
  setEvent() {
    const { toggleItem } = this.props;
    this.addEvent('click', ({ target }) => {
      console.log('target.dataset: ', target.dataset.seq);
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });
  }
}
