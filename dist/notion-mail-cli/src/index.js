"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commander_1 = require("commander");
const send_1 = require("./commands/send");
const read_1 = require("./commands/read");
const program = new commander_1.Command();
console.log('CLI program initialized.');
program
    .version('1.0.0')
    .description('CLI for sending and reading messages via Notion API');
console.log('Version and description set.');
program
    .command('send <sender> <recipient> <message>')
    .description('Send a message')
    .action((sender, recipient, message) => {
    console.log(`Executing 'send' command with sender: ${sender}, recipient: ${recipient}, message: ${message}`);
    (0, send_1.sendMail)(sender, recipient, message);
});
program
    .command('read <recipient>')
    .description('Read messages for a recipient')
    .action((recipient) => {
    console.log(`Executing 'read' command for recipient: ${recipient}`);
    (0, read_1.readMail)(recipient);
});
console.log('Commands registered.');
program.parse(process.argv);
console.log('CLI program execution complete.');
