/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, dice;

onIt();

//ROLL button
document.querySelector('.btn-roll').addEventListener('click', function () {

    //This is how i generated number from 1 to 6 randomly.
    dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    var diceDOM = document.querySelector('.dice');
    //Made dice visible as soon as someone clicks on roll dice button.
    diceDOM.classList.add("displayBlock");
    diceDOM.classList.remove('displayNone');
    diceDOM.src = 'dice-' + dice + '.png';

    //Dice Animation 
    let start = Date.now();
    var Degree = 0;
    var Scaling = 0;
    var id = setInterval(() => {
        let timePassed = Date.now() - start;
        if (timePassed >= 500) {
            clearInterval(id);
            return;
        }
        else {
            Degree += 15;
            Scaling += 0.05
            diceDOM.style.transform = 'scale(' + Scaling + ') ' + ' rotate(' + Degree + 'deg)';
        }
    }, 20);

    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }
});


//HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function () {

    document.querySelector('.dice').classList.add("displayNone");
    document.querySelector('.dice').classList.toggle("displayBlock");
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    score[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    if (score[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).innerHTML = "<b>Winner</b>";
        document.querySelector('.btn-hold').classList.add('displayNone');
        document.querySelector('.btn-roll').classList.add('displayNone');
    }
    else {
        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    }
});


document.querySelector('.btn-new').addEventListener('click', onIt)

function onIt() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('#name-0').innerHTML = "Player 1";
    document.querySelector('#name-1').innerHTML = "Player 2";
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector('.dice').classList.add("displayNone");
    document.querySelector('.btn-hold').classList.remove('displayNone');
    document.querySelector('.btn-roll').classList.remove('displayNone');
    document.querySelector('.btn-hold').style = 'block';
    document.querySelector('.btn-roll').style = 'block';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}




































