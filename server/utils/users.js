[{
    id:'/#234sdfasd',
    name: 'Petar',
    room: 'Cacak'
}]

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user)

        return user;
    }

    removeUser (id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id)
        }

        return user
    }

    getUser (id) {
        let user = this.users.filter(user => user.id === id);

        return user;
    }

    getUserList(room) {
        let users = this.users.filter(user => user.room === room);
        let namesArray = users.map(user => user.name);

        return namesArray;

     }
}

module.exports = {Users};

// class Person {
//     constructor (name, age) {
//        this.name = name;
//        this.age = age;
//     }
//
//     getUserDescription () {
//         return `${this.name} Jen is ${this.age} year(s) old.`
//     }
// }
//
// var me = new Person('Petar', 26);
//
// var description = me.getUserDescription();
//
// console.log(description)
//
