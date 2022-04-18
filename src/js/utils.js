const startTimer = (msec) => {
  const timer = setTimeout(() => console.log('hi'), msec);
  console.log('game over', msec);
  return timer;
};

export { startTimer };
