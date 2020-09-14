import fs from 'fs'
import QueryProcessor from './QueryProcessor';
import Tournament from '../Entities/Tournament';

describe("Process query", () => {
    let tournamentObj = {};
    beforeEach( async () => {
        const tournamentData = await fs.promises.readFile('TestData/expectedTournament.json');
        const tournamentJson = JSON.parse(tournamentData.toString());
        let matchesArr = tournamentJson._matchesArr;
        tournamentObj = new Tournament(matchesArr);
    });

    it("it should process the query for match result", async () => {
        const query = 'Score Match 01';
        const queryProcessorObj = new QueryProcessor(tournamentObj);
        const result = queryProcessorObj.queryMatchResult(query);
        let expected = 'Person A defeated Person B\r\n2 sets to 0';
        expect(result).toBe(expected);
    });
    it("it should return validation message on invalid query", async () => {
        const query = 'blah blah';
        const queryProcessorObj = new QueryProcessor(tournamentObj);
        const result = queryProcessorObj.queryMatchResult(query);
        let expected = 'Please provide a valid query';
        expect(result).toBe(expected);
    });
    it("it should process the query for non-existent match result", async () => {
        const query = 'Score Match 03';
        const queryProcessorObj = new QueryProcessor(tournamentObj);
        const result = queryProcessorObj.queryMatchResult(query);
        let expected = 'Please provide a valid query';
        expect(result).toBe(expected);
    });
    it("it should process the query games for Person A", async () => {
        const query = 'Games Player Person A';
        const queryProcessorObj = new QueryProcessor(tournamentObj);
        const result = queryProcessorObj.queryGamesForPlayer(query);
        let expected = '23 17';
        expect(result).toBe(expected);
    });
    it("it should process the query games for Person B", async () => {
        const query = 'Games Player Person B';
        const queryProcessorObj = new QueryProcessor(tournamentObj);
        const result = queryProcessorObj.queryGamesForPlayer(query);
        let expected = '0 12';
        expect(result).toBe(expected);
    });
    it("it should process the query games for invalid player", async () => {
        const query = 'Games Player Person D';
        const queryProcessorObj = new QueryProcessor(tournamentObj);
        const result = queryProcessorObj.queryGamesForPlayer(query);
        let expected = 'Please provide a valid query';
        expect(result).toBe(expected);
    });
  });