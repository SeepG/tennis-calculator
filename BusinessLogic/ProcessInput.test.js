import fs from 'fs'
import ProcessInput from './ProcessInput';

describe("Process file data function", () => {
    it("it should process the file data)",  async () => {
        const fileData = await fs.promises.readFile('full_tournament.txt');
        const processInputObj = new ProcessInput();
        const result = processInputObj.process(fileData.toString());
    
        const processedData = await fs.promises.readFile('TestData/processedData.json');
        const processedJson = JSON.parse(processedData.toString());
        expect(result).toStrictEqual(processedJson);
    });
  });