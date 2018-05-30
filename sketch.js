//Variable to decide size of boxes
var scale;

//Global iterators
var x, y;

//2-D array to keep track of visited places
//Here, 0 implies not visited
//1 implies visited
var visited;

//Postion of guide
var pos = [4, 4];

//A variable to be the stack
var stack = [];
var sindex = 0;

function setup()
{
  createCanvas(400, 400);
  background(0);
  scale = 20;

  //Setting the frame rate lower
  frameRate(60);

  //Setting up the grid array
  visited = new Array(canvas.height * canvas.width / (scale * scale));

  //Inserting 4 booleans for each postion
  for(x = 0; x < visited.length; ++x)
  {
    visited[x] = new Array(5);
    //For the top position
    visited[x][0] = false;

    //For the right postion
    visited[x][1] = false;

    //For the bottom postion
    visited[x][2] = false;

    //For the left postion
    visited[x][3] = false;

    //For checking whether it has been visited
    visited[x][4] = false;
  }
}

function draw()
{
  //Clearing the screen
  background(0);

  //Drawing the boxes
  for(y = 0; y < canvas.width / scale; ++y)
  {
    for(x = 0; x < canvas.height / scale; ++x)
    {
      //Coloring box if it has been visited
      if(visited[y * canvas.height / scale + x][4] === true)
      {
        noStroke();
        fill(0, 191, 255);
        rect(x * scale, y * scale, scale, scale);
      }

      stroke(255);

      //Top border
      if(visited[y * canvas.height / scale + x][0] === false)
      {
          line(x * scale, y * scale, (x + 1) * scale, y * scale);
      }

      //Right border
      if(visited[y * canvas.height / scale + x][1] === false)
      {
          line((x + 1) * scale, y * scale, (x + 1) * scale, (y + 1) * scale);
      }

      //Bottom border
      if(visited[y * canvas.height / scale + x][2] === false)
      {
          line((x + 1) * scale, (y + 1) * scale, x * scale, (y + 1) * scale);
      }

      //left border
      if(visited[y * canvas.height / scale + x][3] === false)
      {
        line(x * scale, (y + 1) * scale, x * scale, y * scale);
      }
    }
  }

  //Drawing the user
  noStroke();
  fill(250, 0, 120);
  rect(pos[0] * scale, pos[1] * scale, scale, scale);

  //Calling an update function to decide which sides to remove
  update();
}

//Function to decide which path to open
function update()
{
  //Making current positon as visited
  visited[pos[1] * canvas.height / scale + pos[0]][4] = true;

  //Variables to determine which postions are available
  var top = true, right = true, bottom = true, left = true;
  var index;
  var flag = true;

  //Checking if top has been visited
  if( (pos[1] - 1 >= 0 ) && (visited[(pos[1] - 1) * canvas.height / scale + pos[0]][4] === false) )
  {
    top = false;
  }

  //Checking if bottom has been visited
  if( (pos[0] + 1 < canvas.width / scale ) && (visited[pos[1] * canvas.height / scale + (pos[0] + 1)][4] === false) )
  {
    right = false;
  }

  //Checking if top has been visited
  if( (pos[1] + 1 < canvas.height / scale ) && (visited[(pos[1] + 1) * canvas.height / scale + pos[0]][4] === false) )
  {
    bottom = false;
  }

  //Checking if top has been visited
  if( (pos[0] - 1 >= 0 ) && (visited[pos[1] * canvas.height / scale + (pos[0] - 1)][4] === false) )
  {
    left = false;
  }

  //Checking if all the options are blacked
  if( (top) && (right) && (bottom) && (left) )
  {
    //Popping the last element
    stack.pop();

    //Reseting pos
    if(stack.length > 0)
    {
      pos = stack[stack.length - 1];
    }
    //Resetting the maze
    else
    {
      pos = [0, 0];
    }

    //Preventing the searching loop
    flag = false;

  }

  //Choosing direction
  while(flag)
  {
    index = Math.floor(Math.random() * 4);

    //If index is 0
    if((index === 0) && (!top))
    {
      //Undrawing the line along the top path
      visited[pos[1] * canvas.height / scale + pos[0]][0] = true;

      //Setting the new position as position
      pos[1]--;

      //Undrawing the line along the bottom path
      visited[pos[1] * canvas.height / scale + pos[0]][2] = true;

      //Setting flag to false
      flag = false;

      //Pushing position to the stack
      stack.push([pos[0], pos[1]]);
    }

    //If index is 1
    else if((index === 1) && (!right))
    {
      //Undrawing the line along the rigt path
      visited[pos[1] * canvas.height / scale + pos[0]][1] = true;

      //Setting the new position as position
      pos[0]++;

      //Undrawing the line along the left path
      visited[pos[1] * canvas.height / scale + pos[0]][3] = true;

      //Setting flag to false
      flag = false;

      //Pushing position to the stack
      stack.push([pos[0], pos[1]]);
    }

    //If index is 2
    else if((index === 2) && (!bottom))
    {
      //Undrawing the line along the bottom path
      visited[pos[1] * canvas.height / scale + pos[0]][2] = true;

      //Setting the new position as position
      pos[1]++;

      //Undrawing the line along the top path
      visited[pos[1] * canvas.height / scale + pos[0]][0] = true;

      //Setting flag to false
      flag = false;

      //Pushing position to the stack
      stack.push([pos[0], pos[1]]);
    }

    //If index is 3
    else if((index === 3) && (!left))
    {
      //Undrawing the line along the left path
      visited[pos[1] * canvas.height / scale + pos[0]][3] = true;

      //Setting the new position as position
      pos[0]--;

      //Undrawing the line along the right path
      visited[pos[1] * canvas.height / scale + pos[0]][1] = true;

      //Setting flag to false
      flag = false;

      //Pushing position to the stack
      stack.push([pos[0], pos[1]]);
    }
  }
}
