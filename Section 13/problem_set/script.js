function printReverse(arr) {
  for (var i = arr.length-1; i >= 0; i--) {
    console.log(arr[i]);
  }
}
colors = ["red","orange","yellow","green"];
printReverse(colors);

function isUniform(arr) {
   var result = true;
   arr.forEach(function(element, index, arr){
     if (element !== arr[0]) {
       result = false;
     }
   });
   console.log(result);
   return result;
}

test1 = [1,1,1,1];
test2 = [1,2,2,2];
isUniform(test1);
isUniform(test2);

function sumArray(arr) {
  var result = 0;
  arr.forEach(function(num){
    result += num;
  });
  console.log(result);
  return result;
}
sumArray(test1);
sumArray(test2);

function maxCheat(arr) {
  var value = arr.reduce(function(num1, num2){
    return Math.max(num1,num2);
  });
  return value;
}
maxCheat(test1);
maxCheat(test2);

function max(arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max]) {
      max = arr[i];
    }
  }
  console.log(max);
  return max;
}
