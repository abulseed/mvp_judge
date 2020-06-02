import fs from 'fs';
import path from 'path';

const rootDir = path.join(__dirname, '/../input/')

export function readAllInputFiles(
  processInputLine: (sourceName: string) => (line: string, index?: number) => void
) {
  const filenames = fs.readdirSync(rootDir)
  filenames.forEach(readInputFile(processInputLine))
}

function readInputFile(
  processInputLine: (sourceName: string) => (line: string, index?: number) => void
) {
  function createFileStream(sourceName: string) {
    const fileContent = fs.readFileSync(path.join(rootDir, sourceName), { encoding: 'utf-8' });

    const lines = fileContent.split(/\r?\n/);
    lines.forEach(processInputLine(sourceName))
  }
  return createFileStream;
}