const isObject = val => val && typeof val === 'object' && val !== null
const deepFreeze = obj => {
    if (isObject(obj) && !Object.isFrozen(obj)) {
        Object.freeze(obj)

        Object.keys(obj).forEach(name => deepFreeze(obj[name]))
    }
    return obj
}

const obj1 = {
    name: 'harley',
    age: 18,
    address: {
        city: 'nanjing',
        area: 'pukou'
    }
}
deepFreeze(obj1)
obj1.name = 'jack'
console.log(obj1)
console.log(Object.isFrozen(obj1))