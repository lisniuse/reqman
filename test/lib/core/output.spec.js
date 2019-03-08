const outputResult = require('../../../lib/core/outputResult');
const RequestElement = require('../../../lib/core/RequestElement');

let requestElement = new RequestElement({
    name: 'a',
    result: 'test'
})

outputResult(requestElement, './test.txt')
