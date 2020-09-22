let cols; //number of columns
let rows; //number of rows
let w; //width of a box
let h; //height of a box
let grid; //grid containing all nodes (a 2D array)
let visited = [];
let explored = [];
let start, end; //start and end nodes
let stack;

//constructor 
function setup() {
  createCanvas(700, 700);
  background(220);
  cols = 50;
  rows = 50;
  w = width/cols;
  h = height/rows;
  grid = new Array(rows);
  
  
  for(let i = 0; i < rows; i++){
    grid[i] = new Array(cols);
  }
  
  //initializing the grid with rows*cols number of Nodes
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      grid[i][j] = new Node();
      grid[i][j].i = i;
      grid[i][j].j = j;
      grid[i][j].x = i*w;
      grid[i][j].y = j*h;
    }
  }
  
  //adding neighbours
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      grid[i][j].addNeighbours();
    }
  }
  // console.log(grid[10][10].neighbours); 
  // start = grid[0][0];
  start = grid[floor(random(0, rows-1))][floor(random(0, rows-1))];
  start.start = true;
  // end = grid[cols-1][rows-1];
  end = grid[floor(random(0, rows-1))][floor(random(0, rows-1))];
  end.goal = true;
  
  stack = new Stack();
  stack.push(start);
  
  
  
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      if(random()<0.3 && grid[i][j]!=start && grid[i][j]!=end){
        grid[i][j].block = true;
      }
      grid[i][j].draw();
    }
  }
}

function draw() {
    if(!stack.isEmpty()){
      let current = stack.pop();
      if(current == end){
        console.log("FOUND!");
        noLoop();
      }
      else {
        if(!contains(visited, current)){
          visited.push(current);
          for(let i = 0; i < current.neighbours.length; i++){
            if(!contains(visited, current.neighbours[i]) && !current.neighbours[i].block){
              current.neighbours[i].parent = current;
              stack.push(current.neighbours[i]);
            }   
          }
        }
      }
    for(let i = 0; i < visited.length; i++){
      visited[i].draw(color(179, 255, 179));
    }
    
    let path = [];
    let p = current;
    while(p){
      // p.draw(color(148,0,211));
      // p = p.parent;
      path.push(p);
      p = p.parent;
    }
      
  noFill();
  stroke(0, 77, 0);
  strokeWeight(w / 4);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();

  }
}

function contains(arr, element){
  for(let i = 0; i<arr.length; i++){
    if(arr[i] == element){
      return true;
    }
  }
  
  return false;
}