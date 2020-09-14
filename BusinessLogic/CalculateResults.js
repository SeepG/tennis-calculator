import Game from '../Entities/Game';
import Set from '../Entities/Set';
import Match from '../Entities/Match';
import Tournament from '../Entities/Tournament';

class CalculateResults{
    calculate(processedData){
        let matches = [];
        for (const data of processedData) {
            let { player1Score, player2Score, gameId, game, games, gamesWonByPlayer1, setWinner, gamesWonByPlayer2, setId, set, sets, setsWonByPlayer1, setsWonByPlayer2 } 
            = this.initCounters();
           for (const point of data.rawPoints){
                let intPoint = parseInt(point);
                if(intPoint === 0){
                    player1Score ++;
                }
                else if(intPoint === 1){
                    player2Score ++;
                }
                let gameWinner = this.getGameWinner(player1Score, player2Score);
                
                if(gameWinner === 'Player1'){
                    ({ gameId, player1Score, player2Score, game, games } 
                        = this.createGame(gameId, player1Score, player2Score, game, data.Player1, games));
                    gamesWonByPlayer1 ++;
                    setWinner = this.getSetWinner(gamesWonByPlayer1, gamesWonByPlayer2);
                    if(setWinner === 'Player1'){
                        ({ gamesWonByPlayer2, gamesWonByPlayer1, gameId, setId, set, games, sets } 
                            = this.createSet(gamesWonByPlayer2, gamesWonByPlayer1, gameId, setId, set, data.Player1, games, sets));
                        setsWonByPlayer1 ++;
                    }
                }
                else if(gameWinner === 'Player2'){
                    ({ gameId, player1Score, player2Score, game, games } 
                        = this.createGame(gameId, player1Score, player2Score, game, data.Player2, games));
                    gamesWonByPlayer2 ++;
                    setWinner = this.getSetWinner(gamesWonByPlayer1, gamesWonByPlayer2);

                    if(setWinner === 'Player2'){
                        ({ gamesWonByPlayer2, gamesWonByPlayer1, gameId, setId, set, games, sets } 
                            = this.createSet(gamesWonByPlayer2, gamesWonByPlayer1, gameId, setId, set, data.Player2, games, sets));
                        setsWonByPlayer2 ++;
                        
                    }
                }
           }
           
           let matchWinner = this.getMatchWinner(setsWonByPlayer1, setsWonByPlayer2);
           let match = new Match(data.Id, data.Player1, data.Player2, data[matchWinner], sets);
           matches.push(match);
        
        }

        let tournament = new Tournament(matches);
        return tournament;
        
    }
    
    getGameWinner(player1Score, player2Score){
        //deuce condition
        if(player1Score >= 3 && player2Score >= 3){
            let scoreDiff = player1Score - player2Score;
            if(scoreDiff === 2){
                return 'Player1';
            }
            else if(scoreDiff === -2){
                return 'Player2';
            }
        }
        else if(player1Score === 4){
            return 'Player1';
        }
        else if(player2Score === 4){
            return 'Player2';
        }
        else{
            return 'GameInProgress';
        }
    }

    getSetWinner(gamesWonByPlayer1, gamesWonByPlayer2){
        if(gamesWonByPlayer1 === 6){
            return 'Player1';
        }
        else if(gamesWonByPlayer2 === 6){
            return 'Player2';
        }
        else{
            return 'SetInProgress';
        }
    }

    getMatchWinner(setsWonByPlayer1, setsWonByPlayer2){
        if(setsWonByPlayer1 === 2){
            return 'Player1';
        }
        else if(setsWonByPlayer2 === 2){
            return 'Player2';
        }
    }


    initCounters() {
        let player1Score = 0;
        let player2Score = 0;
        let game = {};
        let gameId = 0;
        let setId = 0;
        let games = [];
        let sets = [];
        let set = {};
        let gamesWonByPlayer1 = 0;
        let gamesWonByPlayer2 = 0;
        let setsWonByPlayer1 = 0;
        let setsWonByPlayer2 = 0;
        let setWinner = '';
        return { player1Score, player2Score, gameId, game, games, gamesWonByPlayer1, setWinner, gamesWonByPlayer2, setId, set, sets, setsWonByPlayer1, setsWonByPlayer2 };
    }

    createSet(gamesWonByPlayer2, gamesWonByPlayer1, gameId, setId, set, player, games, sets) {
        gamesWonByPlayer2 = 0;
        gamesWonByPlayer1 = 0;
        gameId = 0;
        setId++;
        set = new Set(setId, player, games);
        sets.push(set);
        games = [];
        return { gamesWonByPlayer2, gamesWonByPlayer1, gameId, setId, set, games, sets };
    }

    createGame(gameId, player1Score, player2Score, game, player, games) {
        gameId++;
        player1Score = 0;
        player2Score = 0;
        game = new Game(gameId, player);
        games.push(game);
        return { gameId, player1Score, player2Score, game, games};
    }
}

export default CalculateResults;