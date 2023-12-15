$(document).ready(function() {

  /** 
  * Winning conditions for 3x3 4x4 and 10x10 grid
  */
  const winningConditions = {
    3: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ],
    4: [
      [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Rows
      [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columns
      [0, 5, 10, 15], [3, 6, 9, 12] // Diagonals
    ],
    10: [
      // Rows
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
      [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
      [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
      [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
      [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],

      // Columns
      [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],
      [2, 12, 22, 32, 42, 52, 62, 72, 82, 92],
      [3, 13, 23, 33, 43, 53, 63, 73, 83, 93],
      [4, 14, 24, 34, 44, 54, 64, 74, 84, 94],
      [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
      [6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
      [7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
      [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
      [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],

      // Diagonals
      [0, 11, 22, 33, 44, 55, 66, 77, 88, 99],
      [9, 18, 27, 36, 45, 54, 63, 72, 81, 90]
    ]
  };

  /**
  * Stores curent grid state with moves
  * Will be iniatialized on game start
  */
  let gameField = []

  /** 
  * Grid ratio
  * Will be iniatialized on game start
  */
  let ratio

  /** 
  * Indicades wich game is active
  */
  let gameStatus = {
    game1: false,
    game2: false,
    game3: false
  }

  /** 
  * Function that sets state up to game parametrs
  * @param {number} type of the game - 1(3x3), 2(4x4) or 3(10x10)
  */
  const activateGame = (game) => {
    switch (game) {
      case 1:
        gameStatus.game1 = true
        gameStatus.game2 = false
        gameStatus.game3 = false

        $('#table').show()

        ratio = 3
        gameField = ratio * ratio
        generateGrid()

        showMainPage(false)
        break

      case 2:
        gameStatus.game2 = true
        gameStatus.game1 = false
        gameStatus.game3 = false

        $('#table').show()

        ratio = 4
        gameField = ratio * ratio
        generateGrid()

        showMainPage(false)
        break

      case 3:
        gameStatus.game3 = true
        gameStatus.game2 = false
        gameStatus.game1 = false

        $('#table').show()

        ratio = 10
        gameField = ratio * ratio
        generateGrid()

        showMainPage(false)
        break

      default:
        gameStatus.game1 = false
        gameStatus.game2 = false
        gameStatus.game3 = false

        $('table').empty()
        $('#table').hide()
        $('#backBtn').hide()

        showMainPage(true)
        break
    }

    
  }

  /** 
  * Function hides main page and shows grid container
  */
  const showMainPage = (show) => {
    if (show) {
      $('.welcome_text').show()
      $('.buttonsContainer').show()
    } else {
      $('.welcome_text').hide()
      $('.buttonsContainer').hide()
      $('#backBtn').show()
    }
  }

  /** 
  * Hadle 3x3 button click and activates game
  */
  $('#firstBtn').click(function() {
    activateGame(1)
  })

  /** 
  * Hadle 4x4 button click and activates game
  */
  $('#secondBtn').click(function() {
    activateGame(2)
  })

  /** 
  * Hadle 10x10 button click and activates game
  */
  $('#thirdBtn').click(function() {
    activateGame(3)
  });

  /** 
  * Hadle back button click and returnin user to menue
  */
  $('#backBtn').click(function() {
    activateGame(0)
  })

  /** 
  * Filling grind container with cells
  * @param {string} id of the container
  */
  const generateGrid = () => {
    gameField = Array(ratio * ratio).fill(null);
    let cell = 0;
    for (let i = 0; i < ratio; i++) {
      $('<tr></tr>').appendTo('#table');
      for (let j = 0; j < ratio; j++) {
        $(`<td id="${cell}"></td>`).appendTo('#table' + ' tr:last');
        cell++;
      }
    }
    console.log('Grid generated')
  };

  /** 
  * Appending X in cell and gameField array
  * @param {number} id of the cell
  */
  const userClick = (id) => {
    $(`#${id}`).append("<img src='X.png' class='image x'>");
    gameField[id] = 'x';
    console.log('user move on:' + id)
  };

  /** 
  * Returning random free cell in gameField array
  * @return {number} random free cell
  */
  const randomCell = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * gameField.length);
    } while (gameField[randomIndex]);

    return randomIndex;
  };

  /** 
  * Appending O in cell and gameField array
  */
  const computeMove = () => {
    let cell = randomCell();
    gameField[cell] = 'o';

    setTimeout(() => $(`#${cell}`).append("<img src='O.png' class='image o'>"), 200)
    console.log('computer move on:' + cell);
  }

  /** 
  * Handeling click on cell
  * Preventing click on already clicked cell
  * Calling userClick function and providiing id of the cell
  * Resets game if someone winns
  * Calling computeMove function
  */
  $(document).on('click', 'td', function() {
    let id = $(this).attr('id');

    console.log('Clicked on: ' + id)

    if (gameField[id] != null) return

    userClick($(this).attr('id'));

    if (checkWinner()) {

      setTimeout(() => {
        alert(checkWinner() == 'x' ? 'You win' : 'Computer wins')
        resetGame()
      }, 100)

    } else {

      computeMove()
      if (checkWinner()) {

        setTimeout(() => {
          alert(checkWinner() == 'x' ? 'You win' : 'Computer wins')
          resetGame()
        }, 400)

      } else {

        if (gameField.filter(item => item === null).length <= 0) {
          setTimeout(() => {
            alert('Draw')
            resetGame()
          }, 450)

        }
      }
    }


  })

  /** 
  * This function checks is there any winner by checking all winning condititons 
  * @return {string} winner if there is any, null otherwise
  */
  const checkWinner = () => {
    let conditions = winningConditions[ratio]

    for (let i = 0; i < conditions.length; i++) {
      gridStatus = []
      for (let j = 0; j < conditions[i].length; j++) {
        gridStatus.push(gameField[conditions[i][j]])
      }
      if (gridStatus.every(cell => cell === gridStatus[0] && cell !== null)) {
        return gridStatus[0]
      }
    }

  }

  /** 
  * Cleanin grid and sets state to initial
  */
  const resetGame = () => {
    $('#table').empty()
    generateGrid()
  }
});