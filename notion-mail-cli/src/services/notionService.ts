import { Client } from '@notionhq/client';

class NotionService {
    private notion: Client;
    private notionPageId: string;

    constructor(notionKey: string, notionPageId: string) {
        this.notion = new Client({ auth: notionKey });
        this.notionPageId = notionPageId;
    }

    async addMessage(sender: string, recipient: string, message: string): Promise<void> {
        try {
            await this.notion.pages.create({
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
        } catch (error) {
            console.error('Error adding message to Notion:', error);
        }
    }

    async getMessagesForRecipient(recipient: string): Promise<any[]> {
        try {
            const response = await this.notion.databases.query({
                database_id: this.notionPageId,
                filter: {
                    property: 'Recipient',
                    rich_text: {
                        contains: recipient,
                    },
                },
            });
    
            return response.results.map((page: any) => {
                console.log('Page properties:', page.properties); // Log the page properties for debugging
                return {
                    ID: page.id, // Use the actual Notion page ID
                    ShortID: page.properties.ID?.rich_text?.[0]?.text?.content || 'Unknown',
                    Sender: page.properties.Sender?.rich_text?.[0]?.text?.content || 'Unknown',
                    Message: page.properties.Message?.title?.[0]?.plain_text || 'No content',
                };
            });
        } catch (error) {
            console.error('Error retrieving messages from Notion:', error);
            return [];
        }
    }

    async deleteMessage(messageId: string): Promise<void> {
        try {
            await this.notion.pages.update({
                page_id: messageId,
                archived: true,
            });
            console.log(`Message with ID: ${messageId} has been deleted.`);
        } catch (error) {
            console.error('Error deleting message from Notion:', error);
        }
    }
}

export default NotionService;