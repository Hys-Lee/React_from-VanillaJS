const renderDebounce = (callback) => {
  let requestId;
  return () => {
    if (requestId) {
      cancelAnimationFrame(requestId);
    }
    requestId = requestAnimationFrame(callback);
  };
};

export default renderDebounce;
