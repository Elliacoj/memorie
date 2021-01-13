let lines = document.getElementsByClassName("line");
let cards = document.getElementsByClassName("card");
let choices = 2;
let choiceCard = document.getElementsByClassName("click");
let score = document.getElementById("points");

let arrayImg = ["ange.jpg", "argent.jpg", "bave.jpg", "bouche.jpg", "fete.jpg", "lunette.jpg"];

document.getElementById("newGame").addEventListener("click", newGame);

function newGame() {

    reset()

    for(let x = 0; x < arrayImg.length; x++) {
        newCard(x);
        newCard(x);
    }

    choicesCard();
}

function newCard(x) {
    let number = random();

    if(cards[number].classList.contains("empty")) {
        let div = document.createElement("div");
        div.style.backgroundImage = "url("+ arrayImg[x] +")";
        div.classList.add("choice");
        cards[number].append(div);
        cards[number].classList.remove("empty");
    }

    else {
        newCard(x)
    }
}

function random() {
    return Math.trunc(Math.random() * 12);
}

function choicesCard() {
    for(let card of cards) {
        card.addEventListener("click", function () {
            if(choices !== 0) {
                if(card.classList.contains("notOk")) {
                    card.classList.remove("notOk")
                    card.lastElementChild.style.display = "block";
                    card.lastElementChild.classList.add("click");
                    choices --;

                    if(choices === 0) {
                        if(choiceCard[0].style.backgroundImage === choiceCard[1].style.backgroundImage) {
                            score.innerHTML = (parseFloat(score.innerHTML) + 1).toString();
                            choiceCard[1].classList.remove("click");
                            choiceCard[0].classList.remove("click");
                            choices = 2;

                            if(score.innerHTML === "6") {
                                endGame();
                            }
                        }

                        else {
                            setTimeout(function () {
                                choiceCard[0].style.display ="none";
                                choiceCard[1].style.display ="none";
                                choiceCard[1].parentElement.classList.add("notOk");
                                choiceCard[0].parentElement.classList.add("notOk");
                                choiceCard[1].classList.remove("click");
                                choiceCard[0].classList.remove("click");
                                choices = 2;
                            }, 1000)
                        }
                    }
                }
            }
        })
    }
}

function endGame() {
    for(let x = 0; x < lines.length; x++) {
        lines[x].style.display = "none";
    }

    document.getElementById("endGame").style.display = "flex";
}

function reset() {
    choices = 2;
    score.innerHTML = "0";

    for (let x = 0; x < cards.length; x++) {
        if(cards[x].classList.length === 2) {
            cards[x].classList.add("empty");
            cards[x].removeChild(cards[x].lastElementChild);
        }
        else if(cards[x].classList.length === 1) {
            cards[x].classList.add("empty", "notOk");
            cards[x].removeChild(cards[x].lastElementChild);
        }
    }

    document.getElementById("endGame").style.display = "none";

    for(let x = 0; x < lines.length; x++) {
        lines[x].style.display = "flex";
    }
}