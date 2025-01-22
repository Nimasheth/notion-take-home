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

        console.log(`User: ${Recipient}`);
        console.log(`\nMessages (${Messages.length}):\n`);

        if (!Messages || Messages.length === 0) {
            console.log(`No messages found for recipient: ${Recipient}`);
            return;
        }

        Messages.forEach(({ ShortID, Sender, Message }: { ShortID: string; Sender: string; Message: string }) => {
            console.log(`Message ID: ${ShortID}`);
            console.log(`from: ${Sender || 'Unknown sender'}`);
            console.log(`${Message || 'No content'}`);
        });

    } catch (error) {
        console.error('Error retrieving messages:', error);
    }
};