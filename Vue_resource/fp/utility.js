/** 
 * 函数体为空 作为函数的占位
*/

const noop = () => void 0

/** 
 * 将函数转换为一元函数
 * 应用场景： 当一些数组和其他的一些高阶函数接受多个值的时候，可以利用此转换为
 * 接受为一个参数
 * 
*/
const unary = fn => arg => fn(arg)

// example
['1', '2', '3'].map(unary(parseInt))

// 将接收的参数直接返回
// 应用场景：应用与数组的filter的时候，过滤假值非常方便
const origin = arg => arg

// example 
[1, 2, 3, '', undefined, null].filter(origin) // [1,2,3]

/** 
 * 将指定的参数作为返回值
 * 应用场景：当参数为函数并且接受参数的时候，可以直接默认返回值 作为包装
 * 
*/

const constant = arg => () => arg

// example
Promise.resolve('s1')
  .then(constant('p2'))
// Promise.resolve('p2')

/** 
 * 函数原来的设计是接受数组，经过转换后 可以使函数接受随意参数
 * 应用场景： 函数的接受参数格式与要传入的参数格式存在冲突时
 * 不改变原来参数的格式，进而将参数进行包装。
*/

const apply = fn => (...arg) => fn(arg)

// example
const add = ([x, y]) => x + y
add([1,2]) // 3

const addNum = apply(add)
addNum(1,2) // 3

/** 
 * 函数本来的设计是接受任意参数，经过转换后，可以传入数组进行快捷传参
 * 应用场景： 任意参数以数组的形式进行传递
*/

const unapply = fn => arg => fn(...arg)

// example
const add = (x, y) => x + y

add(1,2) //3

const addNums = unapply(add)
add([1,2])

/** 
 * partial : 偏函数，先接受部分参数，延迟原函数的执行
 * 应用场景： 当前函数无法立即获得所有参数，得分两批传入，这时候可以用偏函数延迟执行
 * 优势： 可以少写很多重复的代码： 将重复的逻辑封装在一起。
*/

const partial = (fn, ...arg) => (...someArg) => fn(...arg, ...someArg)

//example
// fetch 执行ajax请求

const initUrl = 'http://www.user.com'
const againUrl = 'http://www.again.com'

const fetchUser = id => (fetch(initUrl, {
  method: 'GET',
  body: id
}))

const fetchAnother = id => fetcch(againUrl, {
  method: 'POST',
  body: id
})

// 执行
fetchUser('1019')
fetchAnother('1000')

const fetchs = (url, method, body, fn = origin) => fetch(url, {
  method,
  body: fn(body)
})

const fetchUsers = partial(fetchs, initUrl, 'GET')
const fetchAnothers = partial(fetchs, againUrl, 'POST')
// 执行
fetchUsers('1019')
fetchAnothers('1000')

/** 
 * 
 * partialRight: 根据参数从右向左向制定参数传参调用
 * 应用场景： 先知道待执行函数的后面的参数，暂不知道前面的参数
 * 
*/

const partialRight = (fn, ...arg) => (...someArg) => partial(...someArg.reverse())(...arg.reverse())

/** 
 * curry and looseCurry and unCurry
*/
// 注：因为curry的原理主要是判断要被curry化函数的参数个数，如果参数有默认值的化会导致执行有问题，所以通常提供第二个参数，进行指定要执行的参数
const curry = (fn, arity = fn.length) => {
  const saveArr = []
  const EachArgs = (args, len = arity) => {
      saveArr.concat(args)
      if (saveArr.length < len) {
          return function(nextArg) {
              return EachArgs(nextArg)
          }
      } else {
          return fn(...saveArr)
      }
  }
  return function() {
      return EachArgs(arg)
  }
}

const looseCurry = (fn, arity = fn.length) => {
  const saveArr = []
  const EachArgs = (...args, len) => {
      saveArr.concat(args)
      if (args.length < len) {
          return function(...nextArg) {
              return EachArgs(...nextArg, len - args.length)
          }
      } else {
          return fn(...saveArr)
      }
  }
  return function(...args) {
      return EachArgs(...args, arity)
  }
}

const unCurry = fn => (...arg) => {
  let ret = fn
  for (let i of arg) {
    ret = ret(i)
  }
  return ret 
}

/** 
 * free-point compose pipe
 * 结合 compose组合 partial curry 可以写出point free的代码
 * 要点：注意将分散的逻辑抽出来，进行解耦。再对这些分散的步骤进行组合，再利用偏函数或curry化进行应用。
*/

const reverseArg = fn => (...arg) => fn(...arg.reverse())

const compose = (...fn) => fn.reverse().reduce((acc, cur) => {
  return (...arg) => cur(acc(...arg))
})

const pipe = reverseArg(compose)

// example

// given: ajax( url, data, cb )

var getPerson = partial( ajax, "http://some.api/person" );
var getLastOrder = partial( ajax, "http://some.api/order", { id: -1 } );

getLastOrder( function orderFound(order){
    getPerson( { id: order.personId }, function personFound(person){
        output( person.name );
    } );
} );

const prop = (key, obj) => obj[key]
const setProps = (key, obj, value) => {
  return {
    ...obj,
    [key]: value
  }
}
const exactName = partial(prop,'name')
const personFind = compose(output, exactName)
const getId = partial(prop,'personId')
const proceed = partialRight(getPerson, personFind) 

getLastOrder(function orderFound(order) {
  proceed({ id: order.personId})
})

const getOrder = compose(proceed, partial(setProps, 'id', {}) ,getId)



getLastOrder(getOrder)






