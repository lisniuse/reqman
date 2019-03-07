const mergeHeaders = require('../../../lib/core/mergeHeaders')

console.log(mergeHeaders({
 A: 1
},{
 B: 2
},{
 c: 3
}));