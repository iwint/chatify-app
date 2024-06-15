export interface Chat {
    id: string;
    from: string;
    date: string;
    img: string;
    msg: string;
    read: boolean;
    unreadCount: number;
}