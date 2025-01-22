import fs from 'fs';
import path from 'path';

const mappingFilePath = path.join(__dirname, 'idMapping.json');

const loadMappings = (): { [key: string]: string } => {
    if (fs.existsSync(mappingFilePath)) {
        const data = fs.readFileSync(mappingFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return {};
};

const saveMappings = (mappings: { [key: string]: string }) => {
    fs.writeFileSync(mappingFilePath, JSON.stringify(mappings, null, 2));
};

export const sendMail = async (sender: string, recipient: string, message: string): Promise<{ messageId: string, notionPageId: string }> => {
    const notion = require('@notionhq/client').Client;
    const notionClient = new notion({ auth: process.env.NOTION_KEY });

    const generateShortId = () => Math.floor(Math.random() * 10000).toString();

    const messageId = generateShortId(); 

    const response = await notionClient.pages.create({
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
};