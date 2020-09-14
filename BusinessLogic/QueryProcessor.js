class QueryProcessor {
    constructor (tournament) {
        this._tournament = tournament;
    }
    queryMatchResult(query){
       const matchId = query.split("Score Match ")[1];
       let result = '';
       if(matchId){
        for (const match of this._tournament._matchesArr){
            if (match._matchId === matchId) {
                let playerLost = (match._player2 === match._playerWon)? match._player1: match._player2;
                result += `${match._playerWon} defeated ${playerLost}\r\n`;
                let setsWonByPlayerWon = 0;
                let setsWonByPlayerLost = 0;
                for (const set of match._setsArr){
                    if(set._playerWon === match._playerWon){
                        setsWonByPlayerWon ++;
                    }
                    else if(set._playerWon === playerLost){
                        setsWonByPlayerLost ++;
                    }

                }
                result += `${setsWonByPlayerWon} sets to ${setsWonByPlayerLost}`;
            } 
        }
            
       }
        
       if(!matchId || result === ''){
           result = 'Please provide a valid query';
       }
       return result;
    }

    queryGamesForPlayer(query){
        const player = query.split("Games Player ")[1];
        let result = '';
        let gamesWon = 0;
        let gamesLost = 0;
       if(player){
        for (const match of this._tournament._matchesArr){
                if(match._player1 === player || match._player2 === player){
                    for (const set of match._setsArr){
                        for(const game of set._gamesArr){
                            if (player === game._playerWon) {
                                gamesWon ++;
                            }
                            else {
                                gamesLost ++;
                            }
                        }
                    }
                }
            } 
        }
        
        if(gamesWon > 0 || gamesLost > 0){
            result = `${gamesWon} ${gamesLost}`;
        }
        
       if(!player || result === ''){
           result = 'Please provide a valid query';
       }
       return result;
    }

}
export default QueryProcessor