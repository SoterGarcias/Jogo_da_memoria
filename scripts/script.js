// Constantes para identificar as faces dos cartões e as classes CSS correspondentes
const FRONT = "card_front";
const Back = "card_back";
const CARD = "card";
const ICON = "icon";


//Chama a função startgame ao carregar a página
stargame();

//Função que inicializa o jogo
function stargame(){

    game.creatCardsFronTechs(); // Cria os cartões com base nas tecnologias definidas no objeto 'techs'

    initializerCards(game.cards); // Inicializa o jogo com os cartões criados
}

// Função que inicializa as cartas na tela
function initializerCards(cards){
    let gameBoard = document.getElementById("gameBoard"); // Obtém a div do jogo
    gameBoard.innerHTML = ' '; // Limpa o conteúdo da div do jogo

    // Para cada carta, cria um elemento div e adiciona na div do jogo
    game.cards.forEach(card=>{
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        // Cria o conteúdo das faces da carta
        createCardContent(card, cardElement);

        // Adiciona o evento de clique para virar a carta
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })
}

//Função que cria o conteúdo das faces da carta
function createCardContent(card, cardElement){
        createCardFace(FRONT, card, cardElement); // Cria a face frontal da carta
        createCardFace(Back, card, cardElement); // Cria a face de trás da carta
}

// Função que cria a face da carta (frontal ou de trás)
function createCardFace(face, card, element){

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face == FRONT){
        // Se for a face frontal, cria o elemento img com o ícone correspondente e adiciona na face
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./images/"+card.icon+".png";
        cardElementFace.appendChild(iconElement);
    }else{
        // Se for a face de trás, adiciona o código HTML < />
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

// Função que vira a carta
function flipCard(){

    if (game.setCard(this.id)){

        // Adiciona a classe 'flip' para a div da carta, que vira a carta
        this.classList.add("flip");
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameover()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            }else{
                setTimeout(() =>{
                let fristCardView = document.getElementById(game.fristCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
                
                // Remove a classe 'flip' das cartas que não formam par, desvirando as cartas
                fristCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
                }, 1000);
            }
        }
    }
    

}

// Função que reinicia o jogo
function restart(){
    game.clearCards();
    stargame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}
