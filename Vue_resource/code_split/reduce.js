// 求和的回调
const reducer = (acc, cur) => acc + cur
let sum = [1,2,4,5].reduce(reducer,20)
console.log(sum) 
//累加对象里的值
const accObj = (acc, cur) => {
    if (typeof acc === 'object') {
        return acc.num || 0 + cur.num
    }
    return acc + cur.num
}
let objSum = [{num: 10}, {num: 20}, {num: 30}].reduce(accObj, {})
console.log(objSum)
// 将二位数组转为一位数组
const concatArr = (acc, cur) => acc.concat(cur)
let _concat = [[1,2,3],[4,2],[11,89,2]].reduce(concatArr)
console.log(_concat)
// 计算数组中每个元素出现的次数
const calNum = (acc, cur) => {
    if (cur in acc) {
        acc[cur]++
        return acc
    }
    acc[cur] = 1
    return acc
}
let _obj = [1,2,4,56,72,4,2,1,4,3,0].reduce(calNum, {})
console.log(_obj)
// 按属性对Object进行分类
const groupBy = (arr, key) => arr.reduce((acc, cur) => {
    let val = cur[key]
    if (!acc[val]) {
        acc[val] = []
    }
    acc[val].push(cur)
    return acc
}, {}) 

console.log(groupBy([
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
  ], 'age'))


// 用扩展运算符和initialValue绑定包含在对象数组中的数组
let friends = [{
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21
  }, {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26
  }, {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18
  }]

  console.log(friends.reduce((acc, cur) => {
    return [...acc, ...cur.books]
  }, ['JavaScript']))

  //数组去重
  const reduceSort = (acc, cur) => {
      if (!acc.includes(cur)) {
          acc.push(cur)
      }
      return acc
  }
let _arrSort = [1,1,2,3,4,2,3,1,4,6,7].reduce(reduceSort, [])
console.log(_arrSort)

// 按顺序执行数组的promise

const reducePromise = (acc, cur) => acc.then(cur)

const p1 = function(a) {
    return Promise.resolve(a*3)
}
const p2 = function(a) {
    return Promise.resolve(a*4)
}
const p3 = function(a) {
    return Promise.resolve(a*2)
}

const promiseArr = [p1, p2, p3]

// [p1, p2, p3].reduce(reducePromise, Promise.resolve(10))
//     .then(console.log)
promiseArr.reduce((acc, cur) => acc + cur)

// 功能型管道函数

const pipe = (...fn) => input => fn.reduce((acc, cur) => cur(acc), input)
const double = x => x * 2
const tribble = x => x * 3
const quartable = x => x * 4
const muttliable = pipe(double, tribble, quartable)
console.log(muttliable(6))

const each = (arr, fn) => arr.reduce((acc, cur) => fn(cur), 0)
console.log(each([1,2,3,4,5,6,7,8], console.log))

