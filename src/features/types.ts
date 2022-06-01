export interface IUser {
    id: string;
    name: string;
    password: string;
    phone: string;
    role: 'guest' | 'admin';
}

export interface IReservation {
    id: string;
    size: number;
    userId: string;
    reservedAt: Date;
    status: 'active' | 'cancel' | 'complete';
    user: IUser
}