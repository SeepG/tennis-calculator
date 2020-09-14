import ReadInput from './ReadInput';
import fs from 'fs'

describe("Read file function", () => {
    it("it should read the file whose path is provided)", async () => {
        const filepath = 'full_tournament.txt';
        const readInputObj = new ReadInput();
        const result = await readInputObj.readFile(filepath);
        
        const expected = await fs.promises.readFile(filepath);
        expect(result).toBe(expected.toString());
    });
  });