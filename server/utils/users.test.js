const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Petar',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Tanjuska',
            room: 'React Course'
        },{
            id: '2',
            name: 'Milosko',
            room: 'Node Course'
        }
        ]
    });
    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '232323',
            name: 'Petar',
            room: 'Cacak'
        }

        resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    })

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Petar', 'Milosko'])

    });

    it('should remove a user', () => {
        var userId = 1;
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });

    it('should not remove a user', () => {
        var userId = 11;
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length.toBe(2));

    })

    it('should get a user', () => {
        var user = users.getUser('1');

        expect(user).toEqual([{
            id: '1',
            name: 'Petar',
            room: 'Node Course'
        }]);

    })
});