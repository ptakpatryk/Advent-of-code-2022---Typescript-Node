import fs from 'fs';
import readline from 'readline';


export function getFileInterface(filePath: string) {
  return readline.createInterface({
    input: fs.createReadStream(filePath),
  });
}
