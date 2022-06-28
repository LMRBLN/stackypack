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
        console.log("starting game...")
        
        let growInterval = setInterval(() => {
            this.createLayer();
            if (Math.max(...this.boxArr.map((e) => e.length)) > 19) {
                clearInterval(growInterval);
                console.log("game over")
                modal.style.display = "block";
            }

        }, 5000)
        
        this.box = new Box(this.xPositionStart, this.yPositionStart);
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
                    let positionsToClear = this.getPositionsToClear(this.box.xIndex, this.box.yIndex);
                    if (positionsToClear.length > 2 ) {
                        let dropTime = setTimeout( () => {
                        this.clearPositions(positionsToClear);
                        }, 320)
                    }
                    
                    // positionsToClear =[[0,1],[2,1],[3,1] ....]]
                    
                    // if (positionsToClear.length > 2) {
                        
                        //     let positionsToClearIter =[];
                        //     positionsToClear.forEach(coord => {
                            //         console.log("SAMEEEE",this.getPositionsToClear(coord[0], coord[1]));
                            //         let positionsToClear = this.getPositionsToClear(coord[0], coord[1]);
                            //         console.log('positionsToClearIter', positionsToClear);
                            //         positionsToClearIter.push(positionsToClear);
                            //     });
                            // }
                            
                            this.box = new Box(this.xPositionStart, this.yPositionStart);
                        }



            }
        }); 
    }




getPositionsToClear(x, y) {

    const positionsToClear = [[x, y]] 

    if (y > 0 &&
        this.boxArr[x][y-1] != undefined &&
        this.boxArr[x][y].boxColor == this.boxArr[x][y-1].boxColor )
        {
            positionsToClear.push([x, y-1]);
            
            if (
                y > 1 && 
                this.boxArr[x][y-1].boxColor == this.boxArr[x][y-2].boxColor
                ) {
                    positionsToClear.push([x, y-2]);
                }
                    
            // if y-1 is the same color, we need to check neighbors from here in x direction (both sides)
            if ( 
                x > 0 && 
                this.boxArr[x-1][y-1] != undefined
                ) {
                        if (this.boxArr[x][y-1].boxColor == this.boxArr[x-1][y-1].boxColor) {
                                positionsToClear.push([x-1, y-1]);
                            }
                }
            
             if ( 
                x < this.boxArr.length-1 && 
                this.boxArr[x+1][y-1] != undefined
                ) {
                            
                        if (this.boxArr[x][y-1].boxColor == this.boxArr[x+1][y-1].boxColor) {
                            positionsToClear.push([x+1, y-1]);
                        }
                }            
        }
    
    // from y, we also need to check for same color in x-direction (leftwards), it can be up to two boxes of the same color, on both sides
    if ( x > 0 && 
        this.boxArr[x-1][y] != undefined) {
        if (this.boxArr[x][y].boxColor == this.boxArr[x-1][y].boxColor) {
            positionsToClear.push([x-1, y]);
            if (
                x > 1 && 
                this.boxArr[x-2][y] != undefined && 
                this.boxArr[x][y].boxColor == this.boxArr[x-2][y].boxColor
                ) {
                positionsToClear.push([x-2, y]);
            } 
            if (
                this.boxArr[x-1][y+1] != undefined && 
                this.boxArr[x][y].boxColor == this.boxArr[x-1][y+1].boxColor
                ){
                positionsToClear.push([x-1, y+1]);
            }
            if (
                y > 0 && 
                this.boxArr[x-1][y-1] != undefined && 
                this.boxArr[x][y].boxColor == this.boxArr[x-1][y-1].boxColor
                ){
                positionsToClear.push([x-1, y-1]);
            }

        }
    }

    // check for same color in x-direction (rightwards)
        
    if ( 
        x < this.boxArr.length-1 && 
        this.boxArr[x+1][y] != undefined   && 
        this.boxArr[x][y].boxColor == this.boxArr[x+1][y].boxColor
        ) {
        positionsToClear.push([x+1, y]);
        if (
            x < this.boxArr.length-2 && 
            this.boxArr[x+2][y] != undefined  && 
            this.boxArr[x][y].boxColor == this.boxArr[x+2][y].boxColor
            ) {
                positionsToClear.push([x+2, y]);
        }
        if (
            this.boxArr[x+1][y+1] != undefined && 
            this.boxArr[x][y].boxColor == this.boxArr[x+1][y+1].boxColor
            ){
            positionsToClear.push([x+1, y+1]);
        }
        if (
            this.boxArr[x+1][y-1]!= undefined && 
            this.boxArr[x][y].boxColor == this.boxArr[x+1][y-1].boxColor
            ){
                positionsToClear.push([x+1, y-1]);
            }
        }
        
        console.log(positionsToClear);
        return positionsToClear;
    }

    clearPositions(positionsToClear) {

            positionsToClear.forEach(coord => {
                // console.log("this element is to clearPositions: ")
                // console.log(this.boxArr[coord[0]][coord[1]].domElement);
                this.boxArr[coord[0]][coord[1]].domElement.remove();
    
                //we need to shiftDown all boxes, above the ones that have been removed:
    
                for (let i=coord[1]+1; i<this.boxArr[coord[0]].length; i++) {
                    //console.log(this.boxArr[coord[0]][i]);
                    if (this.boxArr[coord[0]][i] == undefined) {
                        console.log("there is an undefined");
                        continue;
                    }
                    else if (this.boxArr[coord[0]][i].yIndex >= coord[1]) {
                        // console.log("there is a box to shiftDown");
                        // console.log(this.boxArr[coord[0]][i]);
                        // console.log(this.boxArr[coord[0]][i].yIndex);
                        this.boxArr[coord[0]][i].shiftDown();
                    }
                }
            })
            positionsToClear.forEach(coord => {
                this.boxArr[coord[0]].splice(coord[1], 1); 
            })

        console.log(this.boxArr);
    }

    createLayer() {
        for (let i=0; i<this.boxArr.length; i++) {
            this.boxArr[i].forEach(box => {
                box.shiftUp();
            }
            )
            const box = new Box(i*this.width, 0);
            this.boxArr[i].unshift(box);
                
        }
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
        newBoxElm.style.border = "0.5px solid white";
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
        //console.log(array);
        //console.log(this.yIndex);
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

const game = new Game();
game.start();


// Get the modal
var modal = document.getElementById("game-over-modal");

// Get the button that opens the modal
var btn = document.getElementById("play-again-btn");


// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "none";
    location.reload()
    new Game();
    game.start();
}

