import Component from '../core/Component';
export default class ItemAppender extends Component {
  template() {
    return `
            <input type="text" class="appender" placeholder="아이템 이름 입력하셈"/>
        `;
  }
  setEvent() {
    const { addItem } = this.props;
    this.addEvent('keyup', ({ key, target }) => {
      if (key != 'Enter') return;
      addItem(target.value);
    });
  }
}
