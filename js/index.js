class Game {
    constructor() {
        this.time = 0;
        this.box = null;
        this.boxArr = [[],[],[],[],[]]

        this.boxesPerRow = 5; 
        this.width = 60;
        this.height = 20;

        this.xPositionStart = this.boxesPerRow*this.width/2 - this.width/2;
        this.yPositionStart = 20*this.height;
    }

    start() {
        let growInterval = setInterval(() => { // every 5 seconds, the tower grows until reaching a defined height
            this.createLayer(); 
            if (Math.max(...this.boxArr.map((e) => e.length)) > 19) {
                clearInterval(growInterval);
                console.log("game over")
                gameOverModal.style.display = "block";
            }
        }, 5000)
        
        this.box = new Box(this.xPositionStart, this.yPositionStart); // initial box gets created, then: new box gets created as soon as box is dropped
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.addEventListener('keydown', (event) => {
            if(event.key==="ArrowLeft") {
                this.box.moveLeft();
            }
            else if(event.key==="ArrowRight") {
                this.box.moveRight();
            }
            else if(event.code === 'Space' ) {
                if (Math.max(...this.boxArr.map((e) => e.length)) < 20) {
                    this.box.drop(this.boxArr);
                    let positionsToRemove = this.getpositionsToRemove([this.box.xIndex, this.box.yIndex]); // check if there are more than 3 same-color-boxes in a row
                    if (positionsToRemove.length > 2 ) {
                        let dropTime = setTimeout( () => {
                        this.clearPositions(positionsToRemove);
                        }, 350)
                        //this.clearPositions(positionsToRemove);
                    }
                    
                    this.box = new Box(this.xPositionStart, this.yPositionStart);
                }
                else {
                    console.log("game over")
                    gameOverModal.style.display = "block";
                }
            }
        }); 
    }

    getpositionsToRemove(position) {
        
        const positionsToRemove = [];
        positionsToRemove.push(position);

        function checkAdjacent(arr, coord) {
            const adjacents = [];
            let x = coord[0];
            let y = coord[1];
  
  
            if (arr[x][y] != undefined) {
                if (
                    y < arr[x].length-1 &&
                    arr[x][y + 1] != undefined &&
                    arr[x][y].boxColor == arr[x][y + 1].boxColor &&
                    checkIfStoredAlready(positionsToRemove, [x, y + 1]) == false &&
                    checkIfStoredAlready(adjacents, [x, y + 1]) == false
                ) {
                    console.log("all conditions are fine")
                    adjacents.push([x, y + 1]);
                }
            
            
                if (
                    y > 0 &&
                    arr[x][y - 1] !== undefined &&
                    arr[x][y].boxColor == arr[x][y - 1].boxColor &&
                    checkIfStoredAlready(positionsToRemove, [x, y - 1]) == false &&
                    checkIfStoredAlready(adjacents, [x, y - 1]) == false) {
                    adjacents.push([x, y - 1]);
                    
                }
            
                if (
                    x < arr.length-1 &&
                    arr[x + 1][y] != undefined &&
                    arr[x][y].boxColor == arr[x + 1][y].boxColor &&
                    checkIfStoredAlready(positionsToRemove, [x + 1, y]) == false &&
                    checkIfStoredAlready(adjacents, [x + 1, y]) == false
                ) {
                    adjacents.push([x + 1, y]);
                }
            
                if (
                    x > 0 &&
                    arr[x - 1][y] != undefined &&
                    arr[x][y].boxColor == arr[x - 1][y].boxColor &&
                    checkIfStoredAlready(positionsToRemove, [x - 1, y]) == false &&
                    checkIfStoredAlready(adjacents, [x - 1, y]) == false
                ) {
                    adjacents.push([x - 1, y]);
                }
            
                return adjacents;
            }
        }
  
  
        function checkIfStoredAlready(coordArr, coordToCheck) {
            let counter = 0;
            coordArr.forEach((coord) => {
                if (JSON.stringify(coord) === JSON.stringify(coordToCheck)) {
                    counter++;
                }});

            if (counter > 0) {
                return true;
            } 
            else {
                return false;
            }
        }
  

        for (let i=0; i<positionsToRemove.length; i++) {
            let temp = positionsToRemove[i];
            let adjacents = checkAdjacent(this.boxArr, temp);
            positionsToRemove.push.apply(positionsToRemove, adjacents);
        }
  
        console.log('--------These positions have to the same color:')
        console.log(positionsToRemove)

        return positionsToRemove;


    }


    clearPositions(positionsToRemove) {

        console.log('they have to be removed!')

        positionsToRemove.forEach(coord => {
            this.boxArr[coord[0]][coord[1]].domElement.remove();
        })

        positionsToRemove.forEach(coord => { //we need to shiftDown all boxes, above the ones that have been removed:
            // for (let i=coord[1]+1; i<this.boxArr[coord[0]].length; i++) {
            for (let i = this.boxArr[coord[0]].length; i>=coord[1]; i--) {
                if (this.boxArr[coord[0]][i] == undefined) {
                    continue;
                }
                else { 
                    this.boxArr[coord[0]][i].shiftDown();
                    console.log("this one is shifted down")
                    console.log(coord[0][i])
                }
            }
        })





        // positionsToRemove.forEach(coord => {
        //     this.boxArr[coord[0]].splice(coord[1], 1); 
        // })

        positionsToRemove.forEach(coord => {
            console.log("remooove now this:")
            console.log(this.boxArr[coord[0]][coord[1]]);
            this.boxArr[coord[0]][coord[1]] = 'remove';
          });

        for (let i = 0; i < this.boxArr.length; i++) {
            console.log(i);
            for (let j = this.boxArr[i].length-1; j >= 0; j--) {
              if (this.boxArr[i][j] == 'remove') {
                console.log('bla');
                this.boxArr[i].splice(j, 1);
              }
            }
          }
    
    }

    createLayer() {
        for (let i=0; i<this.boxArr.length; i++) {
            this.boxArr[i].forEach(box => {
                box.shiftUp();
            })
            const box = new Box(i*this.width, 0);
            this.boxArr[i].unshift(box);
            
            //const box = new Box(i*this.width, 0);

            // if (box.boxColor !== this.boxArr[i][1]boxColor) {
            //     this.boxArr[i].unshift(box);
            // }
            // else {
            //     box.domElement.remove();
            // }

            
        }

        console.log('After adding a boxlayer, the array is');
        console.log(this.boxArr);
    }
}           

class Box {
    constructor(xPosition, yPosition) {
        this.width = 60; 
        this.height = 20; 
        this.boxesPerRow = 5; 
        this.arrayOfColors = ['#B33951', '#91C7B1', '#F1F7ED', '#E3D081','#918284']

        this.xPosition = xPosition;
        this.yPosition = yPosition;

        this.xIndex = this.xPosition/this.width;
        this.yIndex = this.yPosition/this.height;

        this.boxColor = this.createRandomBoxColor();
        this.domElement = this.createBoxElement();
        }

    createRandomBoxColor() {
        const random = Math.floor(Math.random() * this.arrayOfColors.length);
        const boxcolor = this.arrayOfColors[random];
        return boxcolor;
    }

    createBoxElement() {
        const newBoxElm = document.createElement('div')
        newBoxElm.className = "box";
        
        newBoxElm.style.width = this.width + "px";
        newBoxElm.style.height = this.height + "px";
        newBoxElm.style.backgroundColor = this.boxColor;
        newBoxElm.style.border = "0.5px solid black";
        newBoxElm.style.left = this.xPosition + "px";
        newBoxElm.style.bottom =  this.yPosition + "px";
        
        const boardElm = document.getElementById("board");
        boardElm.appendChild(newBoxElm);
        return newBoxElm;
    }

    moveLeft(){
        if (this.xPosition > 0 && this.xPosition+this.width <= this.boxesPerRow*this.width){
        this.xIndex--;
        this.xPosition-=this.width;
        this.domElement.style.left = this.xPosition + "px";
        }
    }

    moveRight(){
        if (this.xPosition >= 0 && this.xPosition+this.width < this.boxesPerRow*this.width){
        this.xIndex++;
        this.xPosition+=this.width;
        this.domElement.style.left = this.xPosition + "px";
        }
    }

    drop(array){

        this.yIndex = array[this.xIndex].length;
        this.yPosition = (array[this.xIndex].length)*this.height;
        array[this.xIndex].push(this);
        this.domElement.style.bottom = this.yPosition + "px";
        this.domElement.style.transition = "bottom 300ms ease-in 0s";
        
        if (this.yIndex > 19) { 
            console.log("game over")
            console.log(this.yIndex)
            gameOverModal.style.display = "block";
        }
        console.log('The box thas has been dropped is');
        console.log(this.boxColor, this.xIndex, this.yIndex);
        console.log('After dropping the box, the array is');
        console.log(array);
        return array;
    }

    shiftDown() {
        this.yIndex--;
        this.yPosition-=this.height;
        this.domElement.style.bottom = this.yPosition + "px";
    }

    shiftUp() {
        this.yIndex++;
        this.yPosition+=this.height;
        this.domElement.style.bottom = this.yPosition + "px";
        this.domElement.style.transition = "none";
    }
}


var gameOverModal = document.getElementById("game-over-modal");
var startModal = document.getElementById("start-modal");

var playAgainBtn = document.getElementById("play-again-btn");
var startBtn = document.getElementById("start-btn");

playAgainBtn.onclick = function() {
    gameOverModal.style.display = "none";
    location.reload();
}

const game = new Game();
game.start();