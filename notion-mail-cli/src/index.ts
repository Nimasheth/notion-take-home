import dotenv from 'dotenv';
dotenv.config();

import { Command } from 'commander';
import { sendMail } from './commands/send';
import { readMail } from './commands/read';
import { deleteMail } from './commands/delete';

const program = new Command();

console.log('CLI program initialized.');

program
  .version('1.0.0') 
  .description('CLI for sending and reading messages via Notion API'); 

console.log('Version and description set.');

program
  .command('send <sender> <recipient> <message>') 
  .description('Send a message') 
  .action(async (sender: string, recipient: string, message: string) => {
    console.log(`Executing 'send' command with sender: ${sender}, recipient: ${recipient}, message: ${message}`);
    const { messageId } = await sendMail(sender, recipient, message);
    console.log(`Generated message ID: ${messageId}`);
  });

program
  .command('read <recipient>') 
  .description('Read messages for a recipient') 
  .action((recipient: string) => {
    readMail(recipient);
  });

program
  .command('delete <shortId>') 
  .description('Delete a message by short ID') 
  .action((shortId: string) => {
    deleteMail(shortId);
  });

program.parse(process.argv);