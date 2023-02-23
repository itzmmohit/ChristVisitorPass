<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
  <h1>Camera Test</h1>
  <input type="file" id="mypic" accept="image/*" capture="camera">
  <canvas></canvas>
  <br>
  <script>
  var input = document.querySelector('input[type=file]'); // see Example 4
  input.onchange = function () {
    var file = input.files[0];
    //upload(file);
    drawOnCanvas(file);   // see Example 6
    //displayAsImage(file); // see Example 7
  };
 
  function upload(file) {
    var form = new FormData(),
        xhr = new XMLHttpRequest();
 
    form.append('image', file);
    xhr.open('post', 'server.php', true);
    xhr.send(form);
  }
 
  function drawOnCanvas(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var dataURL = e.target.result,
          c = document.querySelector('canvas'), // see Example 4
          ctx = c.getContext('2d'),
          img = new Image();
 
      img.onload = function() {
        c.width = img.width;
        c.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
 
      img.src = dataURL;
    };
 
    reader.readAsDataURL(file);
  }
 
  function displayAsImage(file) {
    var imgURL = URL.createObjectURL(file),
        img = document.createElement('img');
 
    img.onload = function() {
      URL.revokeObjectURL(imgURL);
    };
 
    img.src = imgURL;
    document.body.appendChild(img);
  }
  </script>
<!-- source: http://www.w3.org/TR/html-media-capture/ -->
</body>
</html>