class ProcessInput{
    process(fileData){
        let matches = [];

        let fileDataArr = fileData.split('\r\n');
        let match = {};
        for (const data of fileDataArr) {
            if(data.includes('Match:')){
                match = {
                    'rawPoints':[]
                };
                match.Id = data.split(':')[1].trim();
                matches.push(match);
            }

            else if(data.includes('vs')){
                let players = data.split('vs');
                match.Player1 = players[0].trim();
                match.Player2 = players[1].trim();
            }

            else {
                const score = parseInt(data);
                if(!isNaN(score)){
                    match.rawPoints.push(data);
                }
            }

        }
        return matches;
       
    }
}

export default ProcessInput;