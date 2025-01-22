# Notion Mail CLI

Notion Mail CLI is a command line interface application that allows users to send and read messages using the Notion API. This project provides a simple way to manage messages in a Notion database.

## Features

- Send messages to recipients, which are stored as pages in a Notion database.
- Read messages sent to a specific recipient from the Notion database.

## Project Structure

```
notion-mail-cli
├── src
│   ├── index.ts               # Entry point of the CLI application
│   ├── commands
│   │   ├── send.ts            # Command to send messages
│   │   └── read.ts            # Command to read messages
│   ├── services
│   │   └── notionService.ts    # Service for interacting with the Notion API
│   └── types
│       └── variable.ts           # Type definitions for messages and users
├── package.json                # NPM configuration file
├── tsconfig.json               # TypeScript configuration file
├── .env                        # Environment variables for Notion API
└── README.md                   # Project documentation
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone <repository-url>
   cd notion-mail-cli
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Notion API credentials:
   ```
   NOTION_KEY="your_notion_key"
   NOTION_PAGE_ID="your_notion_page_id"
   ```

## Usage

### Sending a Message

To send a message, use the following command:

```
node dist/index.ts send --sender "Your Name" --recipient "Recipient Name" --message "Your message here"
```

### Reading Messages

To read messages sent to a specific recipient, use the following command:

```
node dist/index.ts read --recipient "Recipient Name"
```

## Improvements

- The application can be extended to include features such as message editing and deletion.
- Implement user authentication for enhanced security.
- Add support for attachments in messages.

## License

This project is licensed under the MIT License.
