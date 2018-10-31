const curry = fn => args => thisArgs => fn(args, thisArgs)

const add = (x, y) => x + y

const curryAdd = curry(add)

const r1 = curryAdd(5)
const r2 = r1(10)   // 15

// 用柯里化来解决类型检查的问题 如： Number   10   返回 true 否则 返回false

const checkType = (type, value) => value.constructor === type

const curryCheckType = curry(checkType)

const check1 = curryCheckType(Number)
const check2 = check1({})  // false

// 自动柯里化的实现


const autoCurry = fn => {
    const len = fn.length
    const saveArr = []
    const EachArgs = (args, len) => {
        saveArr.push(...args)
        if (args.length < len) {
            return function() {
                return EachArgs(arguments, len - args.length)
            }
        } else {
            return fn(...saveArr)
        }
    }
    return function() {
        return EachArgs(arguments, len)
    }
}


const addAll = function(x, y, a, b, c, d) {
    return Array.from(arguments).reduce((a, b) => a + b)
} 

const a1 = autoCurry(addAll)
const a2 = a1(2)(2,3)(1,2)(1)
console.log(a2)
