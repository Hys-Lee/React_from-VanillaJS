import Component from '../core/Component';

export default class ItemFilter extends Component {
  template() {}
  setEvent() {
    const { filterItem } = this.props;
    this.addEvent('click', '.filterBtn', ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  }
}
