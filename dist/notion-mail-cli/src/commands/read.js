"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMail = void 0;
const readMail = (Recipient) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const NotionService = (yield Promise.resolve().then(() => __importStar(require('../services/notionService')))).default;
        const notionKey = process.env.NOTION_KEY;
        const notionPageId = process.env.NOTION_PAGE_ID;
        if (!notionKey || !notionPageId) {
            throw new Error('Missing Notion API credentials. Please check your environment variables.');
        }
        const notionService = new NotionService(notionKey, notionPageId);
        const Messages = yield notionService.getMessagesForRecipient(Recipient);
        console.log(`User: ${Recipient}`);
        console.log(`\nMessages (${Messages.length}):\n`);
        if (!Messages || Messages.length === 0) {
            console.log(`No messages found for recipient: ${Recipient}`);
            return;
        }
        Messages.forEach(({ ShortID, Sender, Message }) => {
            console.log(`Message ID: ${ShortID}`);
            console.log(`from: ${Sender || 'Unknown sender'}`);
            console.log(`${Message || 'No content'}`);
        });
    }
    catch (error) {
        console.error('Error retrieving messages:', error);
    }
});
exports.readMail = readMail;
