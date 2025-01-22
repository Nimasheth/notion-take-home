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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const sendMail = (sender, recipient, message) => __awaiter(void 0, void 0, void 0, function* () {
    const notion = require('@notionhq/client').Client;
    const notionClient = new notion({ auth: process.env.NOTION_KEY });
    const response = yield notionClient.pages.create({
        parent: { database_id: process.env.NOTION_PAGE_ID },
        properties: {
            Title: {
                title: [
                    {
                        text: {
                            content: `Message from ${sender} to ${recipient}`,
                        },
                    },
                ],
            },
            Sender: {
                rich_text: [
                    {
                        text: {
                            content: sender,
                        },
                    },
                ],
            },
            Recipient: {
                rich_text: [
                    {
                        text: {
                            content: recipient,
                        },
                    },
                ],
            },
            Message: {
                rich_text: [
                    {
                        text: {
                            content: message,
                        },
                    },
                ],
            },
        },
    });
    return response;
});
exports.sendMail = sendMail;
