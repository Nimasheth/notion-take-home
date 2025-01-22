export const readMail = async (Recipient: string): Promise<void> => {
    try {
        const NotionService = (await import('../services/notionService')).default;

        const notionKey = process.env.NOTION_KEY;
        const notionPageId = process.env.NOTION_PAGE_ID;

        if (!notionKey || !notionPageId) {
            throw new Error('Missing Notion API credentials. Please check your environment variables.');
        }

        const notionService = new NotionService(notionKey, notionPageId);

        const Messages = await notionService.getMessagesForRecipient(Recipient);

        if (!Messages || Messages.length === 0) {
            console.log(`No messages found for recipient: ${Recipient}`);
            return;
        }

        Messages.forEach(({ Sender, Message }: { Sender: string; Message: string }) => {
            console.log(`From: ${Sender || 'Unknown sender'}`);
            console.log(`Message: ${Message || 'No content'}`);
            console.log('---');
        });

    } catch (error) {
        console.error('Error retrieving messages:', error);
    }
};
