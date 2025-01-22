import dotenv from 'dotenv';
dotenv.config();

import { Command } from 'commander';
import { sendMail } from './commands/send';
import { readMail } from './commands/read';

const program = new Command();

console.log('CLI program initialized.');

program
  .version('1.0.0') 
  .description('CLI for sending and reading messages via Notion API'); 

console.log('Version and description set.');

program
  .command('send <sender> <recipient> <message>') 
  .description('Send a message') 
  .action((sender: string, recipient: string, message: string) => {
    console.log(`Executing 'send' command with sender: ${sender}, recipient: ${recipient}, message: ${message}`);
    sendMail(sender, recipient, message); 
  });


program
  .command('read <recipient>') 
  .description('Read messages for a recipient') 
  .action((recipient: string) => {
    console.log(`Executing 'read' command for recipient: ${recipient}`);
    readMail(recipient); 
  });

console.log('Commands registered.');

program.parse(process.argv);

console.log('CLI program execution complete.');
