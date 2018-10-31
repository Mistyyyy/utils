let noop = () => void 0

const negate = fn => (...args) => !fn.apply(null, args)

const getType = v => v === undefined ? undefined : v === null ? null : v.constructor.name.toLowerCase()
// console.log(getType(noop)) // function

const isArray = v => Array.isArray(v)
// console.log(isArray([])) // true

const isArrayLike = v => {
    try {
        return [...v], true
    } catch(e) {
        return false
    }
}
// console.log(isArrayLike({a: 1}))

// const isBoolean = v => v === true || v === false ? true ? false
const isBoolean = v => typeof v === 'boolean'
// console.log(isBoolean(true), isBoolean(1))

// const isFunction = v => v.constructor.name.toLowerCase() === 'function' ? true : false
const isFunction = v => typeof v === 'function'
// console.log(isFunction(1))

const isNull = v => v === null
// console.log(isNull(0))

const isNotNull = negate(isNull)
// console.log(isNotNull(0))

const isNumber = v => typeof v === 'number'
// console.log(isNumber(0))

const isString = v => typeof v === 'string'
// console.log(isString())

// const isObject = v => typeof v === 'object' && v !== null
const isObject = v => v === Object(v)
// console.log(isObject(null))

const isPrimitive = v => !['object', 'function'].includes(typeof v) || v === null
// const isPrimitive = v => typeof v !== 'object' && typeof v !== 'function' || v === null
// console.log(isPrimitive(Symbol('a')))

const isPlainObject = v => v.constructor.name === 'Object'
// console.log(isPlainObject({}), isPlainObject({name: 'a', __proto__:{}}))

const isPromiseLike = v =>  typeof v === 'object' && typeof v.then === 'function' || v.constructor.name === 'Promise'
// let p1 = Promise.resolve()
// console.log(isPromiseLike(p1))
// console.log(isPromiseLike(1))

const isSymbol = v => typeof v === 'symbol'
// console.log(isSymbol(Symbol('a')))

const isValidJson = v => {
    try {
        JSON.parse(v)
        return true
    } catch (e) {
        return false
    }
}
// console.log(isValidJson('{"name": "1"}'))
