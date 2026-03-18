const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const rstBtn = document.querySelector("#rstBtn");
const winCond =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

let options = ["","","","","","","","",""];
let crntPlayer = "X";
let running = false;

initializeGame();

function initializeGame()
{
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    rstBtn.addEventListener("click",restartGame);
    statusText.textContent = `${crntPlayer}'s turn`;
    running=true;
}

function cellClicked()
{
      const cellIndex = this.getAttribute("cellIndex");


      if(options[cellIndex] != "" || !running)
        return;

      updateCell(this,cellIndex);
      checkWinner();


}

function updateCell(cell,index)
{
    options[index] = crntPlayer;
    cell.textContent = crntPlayer;
}


function changePlaye()
{
    crntPlayer = (crntPlayer == "X") ? "O" : "X";
    statusText.textContent =  `${crntPlayer}'s turns`;
}

function checkWinner()
{
    let roundWon = false;

    for(let i = 0; i< winCond.length; i++)
    {
        const cond = winCond[i];
        const cellA = options[cond[0]];
        const cellB = options[cond[1]];
        const cellC = options[cond[2]];

        if(cellA == "" || cellB == "" || cellC=="")
          continue;

        if(cellA == cellB && cellB == cellC)
        {
          roundWon = true;
          break;
        }
    }

    if(roundWon)
    {
      statusText.textContent=`${crntPlayer} wins!`;
      running = false;

    }
    else if(!options.includes(""))
    {
      statusText.textContent=`Draw!`;
      running = false;
    }
    else
    {
      changePlaye();
    }

}

function restartGame()
{
  crntPlayer = "X";
  options = ["","","","","","","","",""];
  statusText.textContent = `${crntPlayer}'s turn!`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}