export const sendMail = async (sender: string, recipient: string, message: string) => {
    const notion = require('@notionhq/client').Client;
    const notionClient = new notion({ auth: process.env.NOTION_KEY });

    const response = await notionClient.pages.create({
        parent: { database_id: process.env.NOTION_PAGE_ID },
        properties: {
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

    return response;
};
