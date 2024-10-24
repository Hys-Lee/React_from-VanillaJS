let currentObserver;
export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};
export const getObservable = (obj) => {
  const observerMap = {};
  return new Proxy(obj, {
    get: (target, key) => {
      // 해당 key가 처음 사용된 것이라면 새롭게 observerMap에 추가
      if (!observerMap[key]) {
        observerMap[key] = new Set();
      }
      // 각 state값에 대한 observer가 없다면 추가
      if (!observerMap[key].has(currentObserver))
        observerMap[key].add(currentObserver);

      return target[key];
    },
    set: (target, key, value) => {
      // 대충 value가 target[key]랑 같으면 return해서 취소하는 내용
      target[key] = value;
      observerMap[key].forEarch((observer) => observer());
      // 성공적으로 set했으면 true반환해야 한다고 하네. Proxy에서는.
      return true;
    },
  });
};
