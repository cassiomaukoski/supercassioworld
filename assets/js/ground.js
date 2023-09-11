document.addEventListener('DOMContentLoaded', function () {
  const grounds = document.getElementById('grounds');
  var posX = 0;
  for (let i = 0; i < 17; i++) {
    const ground = document.createElement('img');
    console.log(ground);
    ground.className = 'ground';
    ground.src = 'assets/images/ground_1.png';
    ground.style.width = '120px';
    ground.style.height = '240px';
    ground.style.left = posX + 'px';
    ground.style.position = 'absolute';
    posX +=120;
    grounds.appendChild(ground);
  }
});
