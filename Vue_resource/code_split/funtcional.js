const call = (key, ...args) => context => context[key](...args)
// 柯里化 供上下文来调用 这里上下文应该是一个对象
// 应用场景 函数接受一个制定的参数
// const map = call.bind(null, 'map') = function(context) { return context[key](...args) }
// let p1 = new Promise((resolve, reject) => {
//     resolve([1,2,3])
// })
// p1.then(map(n => n * 2)).then(console.log)

const doubleArray = arr => cb => cb(arr)
// function doubleArray (arr) {
//     return function(cb) {
//         return cb(arr)
//     }
// }
let a1 = doubleArray([2,4,6])(call('map',n => n * 2))
console.log(a1)

//function add(arr) {} -> function 
// 将接受数组的函数转化为可接受可选参数的函数
const collecArr = fn => (...args) => fn(args)

function concatArr(arr) {
    return [1,3,4].concat(arr)
}

let proAll = collecArr(Promise.all.bind(Promise))
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = Promise.resolve(3)
proAll(p1,p2,p3).then(val => console.log(val))

// pipeFunctions - 执行从左到右的函数组合

const pipeFunctions = (...fn)  => fn.reduce((acc, cur) => (...args) => cur(acc(...args))

const add5 = x => x + 5
const add6 = x => x + 6
const add7 = x => x + 7
const multiply = (x, y) => x * y
const multiplyAndAdd5 = pipeFunctions(multiply, add5, add6, add7)
console.log(multiplyAndAdd5(5,2))
// 我们先观察 pipleFunctions 返回的是什么 是 fn.reduce(...) 而fn.reduce(...)返回的是 acc 也就是 回调函数的返回值 (...arg) => cur(acc(...args))
// cur arg 是reduce fn 时， 存放的闭包变量 也就是说 pipleFunctions返回的是一个函数 (...arg) => cur(acc(...args))注意这个函数跟表达式里的不一样
// 这个函数是遍历完数组 最终的acc 返回最终的acc之前 我们需要遍历数组 
// 我们来整理一下这个过程
/** 
 * 
 * 
*/
// 将参数数组映射到该函数的输入

const spreadOver = fn => args => fn(...args)



