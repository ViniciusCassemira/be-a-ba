export const game = {
    letters: [],    
    word: '',
    streak: 0,
    error: false,
    inputWords: [],
    newGame: function(){
        this.letters = [];
        this.inputWords = [];
        const alphabet = 'aabcdeefghiijlmnoopqrstuuvxz';
        
        this.letters = new Array(3).fill().map(function(letter){
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet[randomIndex];
        });

        this.word='';
        this.error = false,
        this.streak = 0;
    },
    validateWord :async function(word){
        for(let i=0; i< this.letters.length; i++){
            if(word.includes(this.letters[i]) === false){
                document.getElementById('error').innerText = "A palavra precisa conter as 3 letras";
                this.error = true;
                return false;
            }
        }
        if(this.inputWords.includes(word)){
            document.getElementById('error').innerText = "A palavra já foi digitada";
            this.error = true;
            return false;
        }

        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`)
        const data = await rawData.json();

        if(!data.length){
            document.getElementById('error').innerText = "A palavra digitada não existe";
            return false;
        }

        this.inputWords.push(word)
        this.streak ++;
        return true;
    }
}