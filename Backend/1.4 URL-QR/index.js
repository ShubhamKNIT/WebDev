import inquirer from 'inquirer';
import fs from 'node:fs';
import qr from 'qr-image';
import path from 'node:path';

const answers = await inquirer.prompt([
  {
    type: "input",
    name: "url",
    message: "Enter a URL:"
  }
]);

const url = answers.url;
const filename = path.join(process.cwd(), `qr_${Date.now()}.png`);
const qrSVG = qr.image(url, { type: "png" });
qrSVG.pipe(fs.createWriteStream(filename));
console.log(`QR code generated and saved as: ${filename}`);
