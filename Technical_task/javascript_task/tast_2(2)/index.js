function printFibonacciSeries(n) {
  var series = [];
  
  if (n >= 1) {
    series.push(0);
  }
  
  if (n >= 2) {
    series.push(1);
  }
  
  var a = 0;
  var b = 1;
  
  while (b <= n) {
    var next = a + b;
    if (next <= n) {
      series.push(next);
    }
    a = b;
    b = next;
  }
  
  console.log(series.join(', '));
  document.write(series.join(', '));
}

var userInput = parseInt(prompt("User input:"));
printFibonacciSeries(userInput);
