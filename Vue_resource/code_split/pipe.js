const trim = str => str.replace(/^\s|\s$/g, '')
const normlize = str => str.replace(/-/g, '')

let str = '   4444-2222-aaaa  '

console.log(normlize(trim(str)))