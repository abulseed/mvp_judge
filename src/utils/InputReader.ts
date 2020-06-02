import fs from 'fs';
import readline from 'readline';
import path from 'path';

const rootDir = path.join(__dirname, '/../input/')

export function readAllInputFiles(
  processInputLine: (filename: string) => (line: string) => void,
  complete?: () => void
) {
  fs.readdir(rootDir, function (err, filenames) {
    if (err) {
      throw new Error(`Failed reading directory: ${rootDir}`)
    }
    filenames.forEach(readInputFile(processInputLine, complete));
  });
}

function readInputFile(
  processInputLine: (filename: string) => (line: string) => void,
  complete?: () => void
) {
  function createFileStream(filename: string) {
    const fileStream = fs.createReadStream(path.join(rootDir, filename));

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on('line', processInputLine(filename));
    if (complete) {
      rl.on('close', complete);
    }
  }
  return createFileStream;
}