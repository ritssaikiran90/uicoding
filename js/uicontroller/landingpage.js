document.addEventListener('DOMContentLoaded', function() {

    console.log("inside landingpage.js");
    let cardArray = TotalCards;
    let displayWidth = parseInt(document.body.clientWidth);
    if (displayWidth < 400) {
        loadCardsVertically(cardArray);
    } else {
        groupCards(cardArray);
    }
    window.addEventListener("resize", function(event) {

        console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight + ' high');
        let displayWidth = parseInt(document.body.clientWidth);
        if (displayWidth < 400) {
            var table = document.getElementById("cardholderTable");
            table.innerHTML = "";
            loadCardsVertically(cardArray);
        } else {
            var table = document.getElementById("cardholderTable");
            table.innerHTML = "";
            groupCards(cardArray);
        }
    })

    const shuffle = document.getElementById("shuffle");
    shuffle.addEventListener("click", () => {

        var table = document.getElementById("cardholderTable");
        table.innerHTML = "";
        let cardArray = TotalCards;
        cardArray = shuffleArray(cardArray);
        let displayWidth = parseInt(document.body.clientWidth);
        if (displayWidth < 400) {
            loadCardsVertically(cardArray);
        } else {
            groupCards(cardArray);
        }

    });
    const sort = document.getElementById("sort");
    sort.addEventListener("click", () => {

        var table = document.getElementById("cardholderTable");
        table.innerHTML = "";
        let cardArray = TotalCards;
        cardArray = sortArray(cardArray);
        let displayWidth = parseInt(document.body.clientWidth);
        if (displayWidth < 400) {
            loadCardsVertically(cardArray);
        } else {
            groupCards(cardArray);
        }
    });

});

function shuffleArray(cardArray) {
    return cardArray.sort(() => Math.random() - 0.5);
}

function sortArray(cardArray) {
    return cardArray.sort();
}

function loadCardsVertically(totalcards) {

    for (let i = 0; i < totalcards.length; i++) {
        //console.log("objarray.header " + objarray.header[i]);
        paintCardsVertically(totalcards[i]);

    }
}

function groupCards(totalcards) {

    let table = document.getElementById("cardholderTable");
    let row = document.createElement("TR");
    row.setAttribute("id", "myTr" + 0);
    table.appendChild(row);
    for (let i = 0; i < totalcards.length; i++) {
        //console.log("objarray.header " + objarray.header[i]);
        if (i % 3 == 0) {
            row = document.createElement("TR");
            table.appendChild(row);
        }
        row.setAttribute("id", "myTr" + i);
        paintGroupedCards(totalcards[i], row, table);
    }
}

/**
 * This method loads all the cards to the table vertically
 * @param {} data 
 * @param {*} colorcode 
 */
function paintCardsVertically(data) {

    let x, y, colorCode;
    let table = document.getElementById("cardholderTable");
    x = document.createElement("TR");
    x.setAttribute("id", "myTr" + data);
    table.appendChild(x);
    y = document.createElement("TD");
    let min = 1;
    let max = TotalCards.length - 1;
    let rand = Math.random();
    let randomnumber = Math.floor(rand * (max - min + 1)) + min;
    colorCode = cardColorCodes[randomnumber];
    y.appendChild(getCardNode(data, colorCode, "vertical"));
    x.appendChild(y)
    table.appendChild(x);
}

/**
 * This method loads all the cards to the table in grouped form
 * @param {} data 
 * @param {*} colorcode 
 */
function paintGroupedCards(data, row, table) {

    let y, colorCode;
    y = document.createElement("TD");
    let min = 1;
    let max = TotalCards.length - 1;
    let rand = Math.random();
    let randomnumber = Math.floor(rand * (max - min + 1)) + min;
    colorCode = cardColorCodes[randomnumber];
    y.appendChild(getCardNode(data, colorCode));
    row.appendChild(y);

}


/**
 * This method paints the actual card with number
 * @param {} data 
 * @param {*} colorcode 
 */
function getCardNode(data, colorcode, alignment) {

    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("style", "background-color:" + colorcode + ";");
    let cardContainterDiv = document.createElement("div");
    cardContainterDiv.setAttribute("class", "container");
    let number = document.createElement("H2");
    number.setAttribute("style", "color:white;");
    if (alignment != null && alignment === "vertical") {
        cardContainterDiv.setAttribute("style", "text-align: center;border-left:5px solid" + colorcode);
        cardDiv.setAttribute("style", "background-color:" + "#EFEFEF" + ";");
        number.setAttribute("style", "color:black;");
    }

    let textNode = document.createTextNode(data);
    let boldelement = document.createElement("B");
    boldelement.appendChild(textNode);
    number.appendChild(boldelement);
    cardContainterDiv.appendChild(number);
    cardDiv.appendChild(cardContainterDiv);
    return cardDiv;
}