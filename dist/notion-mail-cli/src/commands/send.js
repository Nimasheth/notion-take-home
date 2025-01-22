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
exports.sendMail = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mappingFilePath = path_1.default.join(__dirname, 'idMapping.json');
const loadMappings = () => {
    if (fs_1.default.existsSync(mappingFilePath)) {
        const data = fs_1.default.readFileSync(mappingFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return {};
};
const saveMappings = (mappings) => {
    fs_1.default.writeFileSync(mappingFilePath, JSON.stringify(mappings, null, 2));
};
const sendMail = (sender, recipient, message) => __awaiter(void 0, void 0, void 0, function* () {
    const notion = require('@notionhq/client').Client;
    const notionClient = new notion({ auth: process.env.NOTION_KEY });
    const generateShortId = () => Math.floor(Math.random() * 10000).toString();
    const messageId = generateShortId();
    const response = yield notionClient.pages.create({
        parent: { database_id: process.env.NOTION_PAGE_ID },
        properties: {
            ID: {
                rich_text: [
                    {
                        text: {
                            content: messageId,
                        },
                    },
                ],
            },
            Message: {
                title: [
                    {
                        text: {
                            content: message,
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
        },
    });
    const idMapping = loadMappings();
    idMapping[messageId] = response.id;
    saveMappings(idMapping);
    return { messageId, notionPageId: response.id };
});
exports.sendMail = sendMail;
