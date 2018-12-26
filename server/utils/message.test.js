let expect = require('expect');
let assert = require('assert')

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        // expect(message).toInclude({from, text})
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'John';
        let longitude = 15;
        let latitude = 19;
        var url = 'https://www.google.com/maps?q=15,19'
        let locationMessage = generateLocationMessage(from, longitude, latitude)
        assert.equal(url, locationMessage.url);
        expect(typeof locationMessage.createdAt).toBe('number');
        // expect(locationMessage).toInclude({from, url})

    })
})