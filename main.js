import ReadInput from './BusinessLogic/ReadInput';
import ProcessInput from './BusinessLogic/ProcessInput';
import CalculateResults from './BusinessLogic/CalculateResults';
import QueryProcessor from './BusinessLogic/QueryProcessor';

const filePath = process.argv[2];
const matchResultQuery = process.argv[3];
const gamesForPlayerQuery = process.argv[4];

if(filePath){
    const readInputObj = new ReadInput();
    readInputObj.readFile(filePath).then(fileData=>{
        const processInputObj = new ProcessInput();
        const processedData = processInputObj.process(fileData.toString());

        const calculateResultsObj = new CalculateResults();
        const tournament = calculateResultsObj.calculate(processedData);

        const queryProcessorObj = new QueryProcessor(tournament);
        if(matchResultQuery){
            const queryResponse = queryProcessorObj.queryMatchResult(matchResultQuery);
            console.log(queryResponse);
            console.log('');
        }

        if(gamesForPlayerQuery){
            const queryResponse = queryProcessorObj.queryGamesForPlayer(gamesForPlayerQuery);
            console.log(queryResponse);
        }

    });

    
}
else{
    console.log('Please provide a valid filepath for the tournament');
}