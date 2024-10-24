import { observe, getObservable } from '../core/observer';
class Store {
  #state;
  constructor(initState) {
    this.#state = getObservable(initState);
  }
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      if (this.#state[key]) {
        this.#state[key] = value;
      }
    });
  }
}

export default Store;
