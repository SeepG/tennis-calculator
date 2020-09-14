import fs from 'fs'
import CalculateResults from './CalculateResults';

describe("Calculate data results from processed input", () => {
    it("it should calculate the data results",  async () => {

        const processedData = await fs.promises.readFile('TestData/processedData.json');
        const processedDataJson = JSON.parse(processedData.toString());
        const calculateResultsObj = new CalculateResults();
        const result = calculateResultsObj.calculate(processedDataJson);
    
        const expectedTournament = await fs.promises.readFile('TestData/expectedTournament.json');
        expect(JSON.stringify(result)).toStrictEqual(expectedTournament.toString());
    });
    it("it should calculate the data results with duce",  async () => {

        const processedData = await fs.promises.readFile('TestData/processedDataWithDuce.json');
        const processedDataJson = JSON.parse(processedData.toString());
        const calculateResultsObj = new CalculateResults();
        const result = calculateResultsObj.calculate(processedDataJson);
    
        const expectedTournament = await fs.promises.readFile('TestData/expectedTournament.json');
        expect(JSON.stringify(result)).toStrictEqual(expectedTournament.toString());
    });
  });