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
const client_1 = require("@notionhq/client");
class NotionService {
    constructor(notionKey, notionPageId) {
        this.notion = new client_1.Client({ auth: notionKey });
        this.notionPageId = notionPageId;
    }
    addMessage(sender, recipient, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.notion.pages.create({
                    parent: { database_id: this.notionPageId },
                    properties: {
                        Sender: {
                            title: [
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
            }
            catch (error) {
                console.error('Error adding message to Notion:', error);
            }
        });
    }
    getMessagesForRecipient(recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.notion.databases.query({
                    database_id: this.notionPageId,
                    filter: {
                        property: 'Recipient',
                        rich_text: {
                            contains: recipient,
                        },
                    },
                });
                return response.results.map((page) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                    console.log('Page properties:', page.properties); // Log the page properties for debugging
                    return {
                        ID: page.id,
                        ShortID: ((_d = (_c = (_b = (_a = page.properties.ID) === null || _a === void 0 ? void 0 : _a.rich_text) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.content) || 'Unknown',
                        Sender: ((_h = (_g = (_f = (_e = page.properties.Sender) === null || _e === void 0 ? void 0 : _e.rich_text) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.content) || 'Unknown',
                        Message: ((_l = (_k = (_j = page.properties.Message) === null || _j === void 0 ? void 0 : _j.title) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.plain_text) || 'No content',
                    };
                });
            }
            catch (error) {
                console.error('Error retrieving messages from Notion:', error);
                return [];
            }
        });
    }
    deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.notion.pages.update({
                    page_id: messageId,
                    archived: true,
                });
                console.log(`Message with ID: ${messageId} has been deleted.`);
            }
            catch (error) {
                console.error('Error deleting message from Notion:', error);
            }
        });
    }
}
exports.default = NotionService;
