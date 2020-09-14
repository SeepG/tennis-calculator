import fs from 'fs'

class ReadInput {
    async readFile(filePath){
        const data = await fs.promises.readFile(filePath);
        return data.toString();
    }

}
export default ReadInput