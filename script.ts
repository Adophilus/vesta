function run(_upperBound) {
  let sum = 0;
  let a = 1;
  let b = 2;

  while (b < _upperBound) {
    if (b % 2 === 0) {
      sum += b;
    }

    [a, b] = [b, a + b]
  }

  return sum;
}
