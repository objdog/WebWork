function isEven(num) {
  if (num % 2 === 0) {
    return true;
  }
  else {
    return false;
  }
}

function factorial(num) {
  if (num === 0) {
    return 1
  }
  result = 0;
  while (num  > 0) {
    result += (num * (num - 1));
    num -= 1;
  }
  return result;
}

function kebabToSnake(str) {
  return str.replace(/-/g,"_")
}
