
function generateDiamondPattern() {
    var rows = parseInt(prompt("Please enter your lucky number: "));
    var charCode = 64; // ASCII code for
  
    // Calculate the number of spaces for each row
    var spaces = rows - 1;
  
    // Loop for each row
    for (var i = 1; i <= rows; i++) {
      // Print spaces
      for (var j = 1; j <= spaces; j++) {
        document.write("&nbsp;&nbsp;&nbsp;");
      }
  
      // Print left side odd numbers
      for (var k = 1; k <= i; k++) {
        document.write((2 * k - 1) + "&nbsp;");
      }
  
      // Print right side alphabets
      for (var l = 1; l < i; l++) {
        document.write(String.fromCharCode(charCode + l) + "&nbsp;");
      }
  
      document.write("<br>");
  
      // Decrement spaces for the next row
      spaces--;
    }
  
    // Reset spaces for the bottom half of the diamond
    spaces = 1;
  
    // Loop for bottom half of the diamond
    for (var i = rows - 1; i >= 1; i--) {
      // Print spaces
      for (var j = 1; j <= spaces; j++) {
        document.write("&nbsp;&nbsp;&nbsp;");
      }
  
      // Print left side odd numbers
      for (var k = 1; k <= i; k++) {
        document.write((2 * k - 1) + "&nbsp;");
      }
  
      // Print right side alphabets
      for (var l = 1; l < i; l++) {
        document.write(String.fromCharCode(charCode + l) + "&nbsp;");
      }
  
      document.write("<br>");
  
      // Increment spaces for the next row
      spaces++;
    }
  }
  
  generateDiamondPattern();

  