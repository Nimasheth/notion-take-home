"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Importing the 'Command' class from the 'commander' library to create and manage CLI commands.
const commander_1 = require("commander");
// Importing the 'sendMail' function to handle sending messages via the Notion API.
const send_1 = require("./commands/send");
// Importing the 'readMail' function to handle reading messages via the Notion API.
const read_1 = require("./commands/read");
// Creating a new Command instance to define the CLI program.
const program = new commander_1.Command();
console.log('CLI program initialized.');
program
    .version('1.0.0') // Version number of the CLI tool.
    .description('CLI for sending and reading messages via Notion API'); // Brief description of the CLI tool.
console.log('Version and description set.');
// Defining the 'send' command for sending messages.
program
    .command('send <sender> <recipient> <message>') // Command syntax with required parameters: sender, recipient, and message.
    .description('Send a message') // Description of the 'send' command.
    .action((sender, recipient, message) => {
    console.log(`Executing 'send' command with sender: ${sender}, recipient: ${recipient}, message: ${message}`);
    (0, send_1.sendMail)(sender, recipient, message); // Calls the 'sendMail' function with the provided arguments.
});
// Defining the 'read' command for reading messages for a specific recipient.
program
    .command('read <recipient>') // Command syntax with one required parameter: recipient.
    .description('Read messages for a recipient') // Description of the 'read' command.
    .action((recipient) => {
    console.log(`Executing 'read' command for recipient: ${recipient}`);
    (0, read_1.readMail)(recipient); // Calls the 'readMail' function with the provided recipient argument.
});
console.log('Commands registered.');
// Parsing the command-line arguments and executing the appropriate command.
program.parse(process.argv);
console.log('CLI program execution complete.');
