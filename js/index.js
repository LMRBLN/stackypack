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
                let sameColor = this.checkArray(this.box.xIndex, this.box.yIndex);
                this.remove(sameColor);
                
            // sameColor =[[0,1],[2,1],[3,1] ....]]

                // if (sameColor.length > 2) {

                //     let sameColorIter =[];
                //     sameColor.forEach(coord => {
                //         console.log("SAMEEEE",this.checkArray(coord[0], coord[1]));
                //         let sameColor = this.checkArray(coord[0], coord[1]);
                //         console.log('sameColorIter', sameColor);
                //         sameColorIter.push(sameColor);
                //     });
                // }
        
                
                this.box = new Box(this.xPositionStart, this.yPositionStart);
            }
        }); 
    }




checkArray(x, y) {

    const sameColor = [[x, y]] 

    if (y > 0 &&
        this.boxArr[x][y-1] != undefined &&
        this.boxArr[x][y].boxColor == this.boxArr[x][y-1].boxColor )
        {
            sameColor.push([x, y-1]);
            
            if (
                y > 1 && 
                this.boxArr[x][y-1].boxColor == this.boxArr[x][y-2].boxColor
                ) {
                    sameColor.push([x, y-2]);
                }
                    
            // if y-1 is the same color, we need to check neighbors from here in x direction (both sides)
            if ( 
                x > 0 && 
                this.boxArr[x-1][y-1] != undefined
                ) {
                        if (this.boxArr[x][y-1].boxColor == this.boxArr[x-1][y-1].boxColor) {
                                sameColor.push([x-1, y-1]);
                            }
                }
            
             if ( 
                x < this.boxArr.length-1 && 
                this.boxArr[x+1][y-1] != undefined
                ) {
                            
                        if (this.boxArr[x][y-1].boxColor == this.boxArr[x+1][y-1].boxColor) {
                            sameColor.push([x+1, y-1]);
                        }

                }
                            
        }
    
           


    // from y, we also need to check for same color in x-direction (leftwards), it can be up to two boxes of the same color, on both sides
    if ( x > 0 && 
        this.boxArr[x-1][y] != undefined) {
        console.log("thiiiiiiiiiiiiiiis",this.boxArr[x-1][y]);
        if (this.boxArr[x][y].boxColor == this.boxArr[x-1][y].boxColor) {
            sameColor.push([x-1, y]);
            if (
                x > 1 && 
                this.boxArr[x-2][y] != undefined && 
                this.boxArr[x][y].boxColor == this.boxArr[x-2][y].boxColor
                ) {
                sameColor.push([x-2, y]);
            } 
            if (
                this.boxArr[x-1][y+1] != undefined && 
                this.boxArr[x][y].boxColor == this.boxArr[x-1][y+1].boxColor
                ){
                sameColor.push([x-1, y+1]);
            }
            if (
                y > 0 && 
                this.boxArr[x-1][y-1] != undefined && 
                this.boxArr[x][y].boxColor == this.boxArr[x-1][y-1].boxColor
                ){
                sameColor.push([x-1, y-1]);
            }

        }
    }

    // check for same color in x-direction (rightwards)
        
    if ( 
        x < this.boxArr.length-1 && 
        this.boxArr[x+1][y] != undefined   && 
        this.boxArr[x][y].boxColor == this.boxArr[x+1][y].boxColor
        ) {
        sameColor.push([x+1, y]);
        if (
            x < this.boxArr.length-2 && 
            this.boxArr[x+2][y] != undefined  && 
            this.boxArr[x][y].boxColor == this.boxArr[x+2][y].boxColor
            ) {
                sameColor.push([x+2, y]);
        }
        if (
            this.boxArr[x+1][y+1] != undefined && 
            this.boxArr[x][y].boxColor == this.boxArr[x+1][y+1].boxColor
            ){
            sameColor.push([x+1, y+1]);
        }
        if (
            this.boxArr[x+1][y-1]!= undefined && 
            this.boxArr[x][y].boxColor == this.boxArr[x+1][y-1].boxColor
            ){
                sameColor.push([x+1, y-1]);
            }
        }
        
        console.log(sameColor);
        return sameColor;
    }

    remove(sameColor) {

        if (sameColor.length > 2 ) {
            sameColor.forEach(coord => {
                // console.log("this element is to remove: ")
                // console.log(this.boxArr[coord[0]][coord[1]].domElement);
                this.boxArr[coord[0]][coord[1]].domElement.remove();
    
                //we need to shift all boxes, above the ones that have been removed:
    
                for (let i=coord[1]+1; i<this.boxArr[coord[0]].length; i++) {
                    //console.log(this.boxArr[coord[0]][i]);
                    if (this.boxArr[coord[0]][i] == undefined) {
                        console.log("there is an undefined");
                        continue;
                    }
                    else if (this.boxArr[coord[0]][i].yIndex >= coord[1]) {
                        // console.log("there is a box to shift");
                        // console.log(this.boxArr[coord[0]][i]);
                        // console.log(this.boxArr[coord[0]][i].yIndex);
                        this.boxArr[coord[0]][i].shift();
                    }
                }
            })
            sameColor.forEach(coord => {
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
        this.arrayOfColors = ['red', 'violet', 'green', 'yellow','lightblue', 'lightpink']

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
        this.domElement.style.bottom = this.yPosition + "px";
    }
    
}

const game = new Game();
game.start();