import Salon from './salon';
import User from './user';

export default class Comment {
    _id: string;
    salon: Salon;
    user: User;
    avatar: string;
    content: string;
    photos: string[];
    createdDate: Date;
}
