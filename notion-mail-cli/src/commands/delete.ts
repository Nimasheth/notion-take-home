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

export const deleteMail = async (shortId: string): Promise<void> => {
    try {
        const NotionService = (await import('../services/notionService')).default;

        const notionKey = process.env.NOTION_KEY;
        const notionPageId = process.env.NOTION_PAGE_ID;

        if (!notionKey || !notionPageId) {
            throw new Error('Missing Notion API credentials. Please check your environment variables.');
        }

        const notionService = new NotionService(notionKey, notionPageId);

        const idMapping = loadMappings();
        const notionMessageId = idMapping[shortId];
        if (!notionMessageId) {
            throw new Error(`No mapping found for short ID: ${shortId}`);
        }

        await notionService.deleteMessage(notionMessageId);

        console.log(`Message with Notion Page ID: ${notionMessageId} has been deleted.`);

    } catch (error) {
        console.error('Error deleting message:', error);
    }
};