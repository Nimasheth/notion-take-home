
# Notion Mail CLI

## Overview

Notion Mail CLI is a simple command-line tool that lets you send and read messages using the Notion API. It also will output a messageId once you send a message or read a message allowing you to DELETE that specific messageid. Messages are stored as pages within a Notion database, providing an easy way to organize and access them. Whether you're looking for a lightweight alternative to traditional email or just want to experiment with Notion's powerful API, this tool has you covered.

## Improvements Implemented

Alongside basic send and read functionalities, I designed the CLI with a modular approach, making it easier to extend in the future. 

## Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- A Notion account with access to a database

### Installation Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd notion-mail-cli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your Notion API credentials by creating a `.env` file in the root directory:

   ```plaintext
   NOTION_KEY="ENTER API KEY HERE"
   NOTION_PAGE_ID="ENTER DATABASE ID HERE"
   ```

4. Compile the project:

   ```bash
   npx tsc
   npm run build
   npm start
   ```

## Usage

### Sending a Message

To send a message, use the following command:

```bash
node dist/notion-mail-cli/src/index.js send <sender> <recipient> <message>
```

**Example:**

```bash
node dist/notion-mail-cli/src/index.js send "Alice" "Bob" "Hello, Bob!"
```

### Reading Messages

To retrieve messages sent to a specific recipient, run:

```bash
node dist/notion-mail-cli/src/index.js read <recipient>
```
### Deleting Messages

To delete messages sent to a specific recipient, run:

```bash
node dist/notion-mail-cli/src/index.js delete <messageID>
```

**Example:**

```bash
node dist/notion-mail-cli/src/index.js send Nima Bob Hello
node dist/notion-mail-cli/src/index.js read Bob
node dist/notion-mail-cli/src/index.js delete 2345
```

## Project Structure

```
notion-mail-cli
├── src
│   ├── index.ts               # Entry point of the CLI application
│   ├── commands
│   │   ├── send.ts            # Command to send messages
│   │   └── read.ts            # Command to read messages
│   │   └── delete.ts          # Command to delete messages
│   ├── services
│   │   └── notionService.ts    # Service for interacting with the Notion API
│   └── types
│       └── variable.ts         # Type definitions for messages and users
├── package.json                # NPM configuration file
├── tsconfig.json               # TypeScript configuration file
├── .env                        # Environment variables for Notion API
└── README.md                   # Project documentation
```

## References

These resources were valuable while building this project:

- [Notion API Documentation](https://developers.notion.com/)
- [Node.js CLI Guide](https://nodejs.org/en/docs/guides/)
- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- Various helpful discussions on StackOverflow.

## Future Improvements

- **Message Editing and Deletion:** Allow users to modify or remove messages.
- **Search and Filters:** Implement options to filter messages by date, sender, or keywords.
- **User Authentication:** Add authentication to protect access to messages.

## Technical and Product Decisions

- **Why TypeScript?** I chose TypeScript for better code maintainability and type safety.
- **Minimal Dependencies:** No heavy CLI frameworks were used to keep the project a little more simple.
- **Notion as a Database:** Notion provides a flexible and user-friendly way to store and retrieve messages.


