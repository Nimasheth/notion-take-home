"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commander_1 = require("commander");
const send_1 = require("./commands/send");
const read_1 = require("./commands/read");
const delete_1 = require("./commands/delete");
const program = new commander_1.Command();
console.log('CLI program initialized.');
program
    .version('1.0.0')
    .description('CLI for sending and reading messages via Notion API');
console.log('Version and description set.');
program
    .command('send <sender> <recipient> <message>')
    .description('Send a message')
    .action((sender, recipient, message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Executing 'send' command with sender: ${sender}, recipient: ${recipient}, message: ${message}`);
    const { messageId } = yield (0, send_1.sendMail)(sender, recipient, message);
    console.log(`Generated message ID: ${messageId}`);
}));
program
    .command('read <recipient>')
    .description('Read messages for a recipient')
    .action((recipient) => {
    (0, read_1.readMail)(recipient);
});
program
    .command('delete <shortId>')
    .description('Delete a message by short ID')
    .action((shortId) => {
    (0, delete_1.deleteMail)(shortId);
});
program.parse(process.argv);
