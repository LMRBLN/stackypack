

// const array = [[['red', 'blue', 'red'], ['red', 'blue', 'red'], ['red', 'blue', 'red']],
// [['red', 'blue', 'red'], ['red', 'blue', 'red'], ['red', 'blue', 'red']],
// [['red', 'blue', 'red'], ['red', 'blue', 'red'], ['red', 'blue', 'red']]]


// console.log(array[2][1][1])

//console.log(array[0][0].indexOf('blue'))
// element is array[2][1][1]

// function checkForSameColor(element) {
//     if (element())

// }

array[0][0].forEach(color => {
}

)



for (let i=0; i<array.length; i++) {
    const tempXarr = [];
    if (array[0][0][i]== array[0][0][i+1]) {
        tempXarr.push(array[0][0][i+1])
    }
}

/**
 * Index of Multidimensional Array
 * @param arr {!Array} - the input array
 * @param k {object} - the value to search
 * @return {Array} 
 */

 function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }

  indexi = getIndexOfK(array, 'blue');
  console.log(indexi);



  // when the cube is dropped, I have value, positionX, positionY, positionZ
  let neighbors = [];

  function checkNeighbors (arr, value, x, y, z) {
        // if (arr[x][y][z-1] = value) {
        //     neighbors.push(indexOf(arr[x][y][z-1]))
        //     return z--;
        //     checkNeighbors();
        // }

        let neighborsZ = [z]
        for (let i=1; i<z; i++) {
            if ((arr[x][y][z-i] = value)) {
                neighborsZ.push(z-i);
                for (let j=1; j<arr[x][y].length; j++) {
                    neighbors
                }
            else {
                break;
            }
            }
        }
    }



    function checkNeighborsZ (arr, value, x, y, z) {
        let neighborsZ = [z];
        for (let i=1; i<z; i++) {
            if (arr[x][y][z-i] = value) {
                neighborsZ.push(z-i);
            }
            else {
                break;
            }
        return neighborsZ;
        }   
    }

    function checkNeighborsY (arr, value, x, y, z) {
        let neighborsY = [];
        const lastOnEverySideY = [arr[x][y].length-y, y]
        const maxY = Math.max(lastOnEverySideY);
        for (let i=0; i<maxY; i++) {
            if (array[x][y+i][z] = value) {
                neighborsY.push(i);
            }
            if (array[x][y-1][z] = value) {
                neighborsY.push(-i);
            }
        return neighborsY;
        }
    }

//// examply with only y and z

    function checkNeighborsZ (arr, value, y, z) {
        let neighborsZ = [z];
        for (let i=1; i<z; i++) {
            if (arr[y][z-i] = value) {
                neighborsZ.push(z-i);
            }
            else {
                break;
            }
        return neighborsZ;
        }   
    }

    function checkNeighborsY (arr, value, y, z) {
        let neighborsY = [];
        const lastOnEverySideY = [arr[y].length-y, y]
        const maxY = Math.max(lastOnEverySideY);
        for (let i=0; i<maxY; i++) {
            if (array[y+i][z] = value) {
                neighborsY.push(i);
            }
            if (array[y-1][z] = value) {
                neighborsY.push(-i);
            }
        return neighborsY;
        }
    }

////// attention, it can be maximum 2!!!

function checkNeighborsZ (arr, value, y, z) {
    let neighborsZ = [[y, z]];
    if (arr[y][z-1] == value) {
        neighborsZ.push([y, z-1]);
        if (arr[y][z-2] == value){
            neighborsZ.push([y, z-2]);
        }
    }
    if (arr[y][z+1] == value) {
            neighborsZ.push([y, z+1]);
    }
    return neighborsZ;
}

function checkNeighborsY (arr, value, y, z) {
    let neighborsY = [];
    if (array[y+1][z] == value) {
        neighborsY.push([y+1, z]);
        if (array[y+2][z] == value) {
            neighborsY.push([y+2, z]);
        } 
    }
    if (array[y-1][z] == value) {
        neighborsY.push([y-1, z]);
        if (array[y-2][z] == value) {
            neighborsY.push([y-2, z]);
        }
    }
    return neighborsY;
}

/////// with pairs of coordinates

let coord = [y, z]; 

function checkNeighborsZ (arr, value, coord) {
    let neighborsZ = [coord];
    const y = coord[0];
    const z = coord[1];
    if (arr[y][z-1] == value) {
        neighborsZ.push([y, z-1]);
        if (arr[y][z-2] == value){
            neighborsZ.push([y, z-2]);
        }
    }
    if (arr[y][z+1] == value) {
            neighborsZ.push([y, z+1]);
    }
    return neighborsZ;
}

function checkNeighborsY (arr, value, coord) {
    let neighborsY = [];
    const y = coord[0];
    const z = coord[1];
    if (arr[y+1][z] = value) {
        neighborsY.push([y+1, z]);
        if (arr[y+2][z] = value) {
            neighborsY.push([y+2, z]);
        } 
    }
    if (arr[y-1][z] = value) {
        neighborsY.push([y-1, z]);
        if (arr[y-2][z] = value) {
            neighborsY.push([y-2, z]);
        }
    }
    return neighborsY;
}
//////








const neighborsZ = checkNeighborsZ(arr, value, coord);
console.log(neighborsZ);

neighborsZ = [[1,2], [2,2]];

neighborsZ.forEach(element => {
    const neighborsY = checkNeighborsY (arr, value, element);

})

const neighborsY = checkNeighborsY (arr, value, 3, 4);
console.log(checkNeighborsY);

if (neighborsZ.length+checkNeighborsY.length >=  2) {
    const 
} 



