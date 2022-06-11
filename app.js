document.addEventListener('DOMContentLoaded', () => {
    const width=10;
    const grid=document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');

    ///tetriminos

    const lTetrimino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ];

  const zTetrimino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ];

  const tTetrimino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ];

  const oTetrimino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ];

  const iTetrimino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ];

  const tetriminos = [lTetrimino, zTetrimino, tTetrimino, oTetrimino, iTetrimino];

  let currentPosition=4;
  let currentRotation=0;
  let random= Math.floor(Math.random()*tetriminos.length);
  let current = tetriminos[random][currentRotation];

  function draw(){
      current.forEach(index=>{
          squares[currentPosition+index].classList.add('tetrimino')
      })

  }
  function undraw(){
      current.forEach(index=>{
          squares[currentPosition+index].classList.remove('tetrimino')
      })

  }

  timerId = setInterval(movedown,1000);

  function control(e){
      if(e.keyCode === 37){
          moveLeft();        
      }else if(e.keyCode === 38){
          fnRotate();        
      }else if(e.keyCode === 39){
          moveRight();        
      }else if(e.keyCode === 40){
          moveDown();        
      }
  }

  document.addEventListener('keyup',control)



  function movedown(){
      undraw();
      currentPosition+=width;
      draw();
      freeze();
  }
  
  function freeze(){
      if(current.some(index => squares[currentPosition+index+width].classList.contains('taken'))){
          current.forEach(index => squares[currentPosition+index].classList.add('taken'));
          random = Math.floor(Math.random() * tetriminos.length);
          current= tetriminos[random][currentRotation];
          currentPosition=4;
          draw();
      } 
  }

  function moveLeft(){
      undraw();
      const isAtLeftEdge = current.some( index => (currentPosition+index) % width === 0);
      if(!isAtLeftEdge){
          currentPosition-=1;
      } 
      if(current.some(index => squares[currentPosition+index].classList.contains('taken'))){
          currentPosition+=1;
      }
      draw();
  }

  function moveRight(){
      undraw();
      const isAtRightEdge = current.some( index => (currentPosition+index) % width === width - 1);
      if(!isAtRightEdge){
          currentPosition+=1;
      } 
      if(current.some(index => squares[currentPosition+index].classList.contains('taken'))) {
          currentPosition-=1;
      }
      draw();
  }

  function fnRotate(){
      //alert("asdsad")
      undraw();
      currentRotation++;
      if(currentRotation === current.length){
          currentRotation=0;
      }
      current= tetriminos[random][currentRotation];
      draw();

  }

  const displaySquares = document.querySelectorAll('.mini-grid div')
  


})

