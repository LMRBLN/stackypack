class Game {
    constructor() {
        this.time = 0;
        this.box = null;
        this.boxArr = [[],[],[],[],[]]

        this.boxesPerRow = 5; 
        this.width = 60;
        this.height = 20;

        this.xPositionStart = this.boxesPerRow*this.width/2 - this.width/2;
        this.yPositionStart = 10*this.height;
    }

    start() {
        console.log("starting game...")
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
                this.box.drop(this.boxArr);
                this.checkArray();
                this.box = new Box(this.xPositionStart, this.yPositionStart);
            }
        }); 
    }

    checkArray() {
        
        const sameColor = [[this.box.xIndex, this.box.yIndex]]  

        // check for same color in y-direction (only downwards), we have to check y-1 and y-2
        if (this.box.yIndex > 0 &&
            this.boxArr[this.box.xIndex][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex][this.box.yIndex-1].boxColor )
            {
                sameColor.push([this.box.xIndex, this.box.yIndex-1]);
                
                if (
                    this.box.yIndex >1 && 
                    this.boxArr[this.box.xIndex][this.box.yIndex-1].boxColor == this.boxArr[this.box.xIndex][this.box.yIndex-2].boxColor
                    ) {
                        sameColor.push([this.box.xIndex, this.box.yIndex-2]);
                    }
                        
                // if y-1 is the same color, we need to check neighbors from here in x direction (both sides)
                if ( 
                    this.box.xIndex > 0 && 
                    this.boxArr[this.box.xIndex-1][this.box.yIndex-1] != undefined
                    ) {
                            if (this.boxArr[this.box.xIndex][this.box.yIndex-1].boxColor == this.boxArr[this.box.xIndex-1][this.box.yIndex-1].boxColor) {
                                    sameColor.push([this.box.xIndex-1, this.box.yIndex-1]);
                                }
                    }
                
                 if ( 
                    this.box.xIndex < this.boxArr.length-1 && 
                    this.box.xIndex > 0 && 
                    this.boxArr[this.box.xIndex+1][this.box.yIndex-1] != undefined
                    ) {
                                
                            if (this.boxArr[this.box.xIndex][this.box.yIndex-1].boxColor == this.boxArr[this.box.xIndex+1][this.box.yIndex-1].boxColor) {
                                sameColor.push([this.box.xIndex+1, this.box.yIndex-1]);
                            }

                    }
                                
            }
        
          
                        
    

        // from y, we also need to check for same color in x-direction (leftwards), it can be up to two boxes of the same color, on both sides
        if ( this.box.xIndex > 0 && 
            this.boxArr[this.box.xIndex-1][this.box.yIndex] != undefined) {
            
            if (this.boxArr[this.box.xIndex][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex-1][this.box.yIndex].boxColor) {
                sameColor.push([this.box.xIndex-1, this.box.yIndex]);
                if (
                    this.box.xIndex > 1 && 
                    this.boxArr[this.box.xIndex-2][this.box.yIndex] != undefined && 
                    this.boxArr[this.box.xIndex][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex-2][this.box.yIndex].boxColor
                    ) {
                    sameColor.push([this.box.xIndex-2, this.box.yIndex]);
                } 
                if (
                    this.boxArr[this.box.xIndex-1][this.box.yIndex+1] != undefined && 
                    this.boxArr[this.box.xIndex-1][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex-1][this.box.yIndex+1].boxColor
                    ){
                    sameColor.push([this.box.xIndex-1, this.box.yIndex+1]);
                }
                if (
                    this.boxArr[this.box.xIndex-1][this.box.yIndex-1] != undefined && 
                    this.boxArr[this.box.xIndex-1][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex-1][this.box.yIndex-1].boxColor
                    ){
                    sameColor.push([this.box.xIndex-1, this.box.yIndex-1]);
                }

            }
        }

        // check for same color in x-direction (rightwards)
            
        if ( 
            this.box.xIndex < this.boxArr.length-1 && 
            this.boxArr[this.box.xIndex+1][this.box.yIndex] != undefined   && 
            this.box.xIndex < this.boxArr.length && 
            this.boxArr[this.box.xIndex][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex+1][this.box.yIndex].boxColor
            ) {
            sameColor.push([this.box.xIndex+1, this.box.yIndex]);
            if (
                this.box.xIndex < this.boxArr.length-2 && 
                this.boxArr[this.box.xIndex+2][this.box.yIndex] != undefined  && 
                this.boxArr[this.box.xIndex][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex+2][this.box.yIndex].boxColor
                ) {
                    sameColor.push([this.box.xIndex+2, this.box.yIndex]);
            }
            if (
                this.boxArr[this.box.xIndex+1][this.box.yIndex+1] != undefined && 
                this.boxArr[this.box.xIndex+1][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex+1][this.box.yIndex+1].boxColor
                ){
                sameColor.push([this.box.xIndex+1, this.box.yIndex+1]);
            }
            if (
                this.boxArr[this.box.xIndex+1][this.box.yIndex-1]!= undefined && 
                this.boxArr[this.box.xIndex+1][this.box.yIndex].boxColor == this.boxArr[this.box.xIndex+1][this.box.yIndex-1].boxColor
                ){
                sameColor.push([this.box.xIndex+1, this.box.yIndex-1]);
            }
        }

        console.log(sameColor);

        if (sameColor.length > 2 ) {
            sameColor.forEach(coord => {
                console.log("this element is to remove: ")
                console.log(this.boxArr[coord[0]][coord[1]].domElement);
                this.boxArr[coord[0]][coord[1]].domElement.remove();

                // we need to shift all boxes, above the ones that have been removed:

                // for (let i=0; i<this.boxArr.length; i++) {
                //     this.boxArr[i].forEach (box => {
                //         if (box.xIndex == coord[0] && box.yIndex > coord[1]) {
                //             box.shift();
                //         }
                //     } )
                // }


                this.boxArr[coord[0]].splice(coord[1], 1); 
            })

        }
        console.log(this.boxArr);

    }


}

class Box {
    constructor(xPosition, yPosition) {
        this.width = 60; 
        this.height = 20; 
        this.boxesPerRow = 5; 
        this.arrayOfColors = ['red', 'violet', 'green', 'yellow']

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
        //console.log(array);
        //console.log(this.yIndex);
        return array;
    }

    shift() {
        this.yIndex--;
        this.yPosition-=this.height;
    }
    
}

const game = new Game();
game.start();