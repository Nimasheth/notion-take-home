export interface Message {
    id: string;
    sender: string;
    recipient: string;
    content: string;
    timestamp: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
}