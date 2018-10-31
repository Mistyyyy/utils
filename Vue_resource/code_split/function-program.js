// 一个求平均数的函数 首先-应该有总数，一个是个数
const total = (a, b) => a + b
const len = arr => arr.length
const sum = arr => arr.reduce(total)
const divide = (a, b) => a/b


const average = arr => divide(sum(arr), len(arr))


const input = [80, 90, 100]


console.log(average(input))