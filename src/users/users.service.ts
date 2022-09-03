import { Injectable } from '@nestjs/common';
export type User = any;


@Injectable()
export class UsersService {

    //credentials
    private readonly users = [
        {
            userId: 1,
            username: 'Anthony',
            password: 'Thumbi',
        },
        {
            userId: 2,
            username: 'Len',
            password: 'Marais',
        },
        {
            userId: 3,
            username: 'autocheck',
            password: 'autocheck',
        },
    ];
    //get the credentials put if they match
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

}
