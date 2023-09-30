import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const path = "./out/QR_Library"
const contents = "./out/QR_Contents.txt"

inquirer.prompt([{name: "data", message: "Convert my data:"}, {name: "type", type: "list", message: "Type:", choices: [{name: "PNG"}, {name: "SVG"}]}]).then((answers) => {
   const data = answers.data;
   const type = answers.type;
   const qr_img = qr.image(data, {type: type});
   const fileLines = fs.readdirSync(path).length;
   qr_img.pipe(fs.createWriteStream(`${path}/QR ${fileLines !== 0 ? fileLines : ""}.${type.toLowerCase()}`));
   fs.writeFile(contents, `QR ${fileLines + 1} (${type.toUpperCase()}) : ${data}\n`, {flag:"a",encoding:"utf-8"}, (err) => {
	  if (err) console.log("Error!", err);
	  else console.log("Successful!");
   })
}).catch(e => {
   if (e.isTtyError) {
	  console.log("Please run in a Terminal");
   } else {
	  console.log("Oops! Error occured:\n", e);
   }
})
