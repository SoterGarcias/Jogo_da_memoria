//Armazena o número de jogadas que foi feito
let counter = 0;

let game = {
    // Modo de travamento, impede que outras cartas sejam selecionadas durante uma jogada em andamento.
    lockMode: false,

    // Armazena a primeira e a segunda carta selecionada pelo jogador.
    fristCard: null,
    secondCard: null,

    // Função que define a carta selecionada pelo jogador.
    setCard: function (id) {
        // Seleciona a carta com base no ID.
        let card = this.cards.filter(card => card.id === id)[0];

        // Verifica se a carta já está virada ou se o modo de travamento está ativado.
        if (card.flipped || this.lockMode) {
            return false;
        }

        // Define a primeira carta selecionada.
        if (!this.fristCard) {
            this.fristCard = card;
            this.fristCard.flipped = true;
            return true;
        }
        // Define a segunda carta selecionada e ativa o modo de travamento.
        else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    // Função que verifica se as duas cartas selecionadas são iguais.
    // E conta o números de jogadas.
    checkMatch: function () {
        if (!this.fristCard || !this.secondCard) {
            counter++;
            return false;
        }
        if (this.fristCard.icon === this.secondCard.icon) {
            counter++;
        }
        return this.fristCard.icon === this.secondCard.icon;
    },

    // Função que redefine as variáveis de carta selecionada para o estado padrão.
    clearCards: function () {
        this.fristCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    // Função que redefine as cartas selecionadas para o estado "não virada".
    unflipCards() {
        this.fristCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    // Função que verifica se todas as cartas foram viradas.
    checkGameover() {
        // Quando o ! é adicionado antes, a função irá retornar as cartas "não viradas" caso nenhuma esteja "não virada".
        if (this.cards.filter(card => !card.flipped).length == 0) {
            document.getElementById('counter').textContent = `Você realizou ${counter} jogadas`;
            return true;
        }
        return false;
    },

    // Lista de tecnologias usadas para criar os pares de cartas.
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react',
    ],

    // Array que armazena todas as cartas do jogo.
    cards: null,

    // Função que cria as cartas do jogo com base nas tecnologias definidas na lista 'techs'.
    creatCardsFronTechs: function () {
        // Inicializa o array de cartas.
        this.cards = [];

        // Cria pares de cartas com base nas tecnologias definidas na lista 'techs'.
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFronTech(tech));
        })

        // Transforma a matriz de pares de cartas em uma matriz de cartas simples e as embaralha.
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
    },


    createPairFronTech: function (tech) {

        // Cria um par de cartas com o ícone e o ID da tecnologia passada como parâmetro
        return [{
            id: this.creatIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.creatIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    creatIdWithTech: function (tech) {
        // Cria um ID único para a carta usando o nome da tecnologia e um número aleatório de 0 a 999
        return tech + parseInt(Math.random() * 1000);
    },

    //1.3
    shuffleCards: function (cards) {
        // Embaralha as cartas no array usando o algoritmo Fisher-Yates
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // Troca as posições das cartas no array para embaralhá-las
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },



}