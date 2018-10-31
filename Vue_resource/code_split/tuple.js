const Tuple = function() {
    const args = Array.prototype.slice.call(arguments, 0)

    const _T = function() {
        const thisArgs = Array.prototype.slice.call(arguments, 0)
        if (thisArgs.length !== args.length) {
            throw new Error('The arguments must have the same length with Tuples arguments length')
        }
        if (thisArgs.some((v) => v === null || v === undefined)) {
            throw new Error('The arguments must have valid value')
        }
        if (thisArgs.some((item, index) => item.constructor !== args[index])) {
            throw new Error('The arguments must have the same data type')
        } else {
            thisArgs.map((v, i) => this['_'+(i+1)] = v, this)
        }
        Object.freeze(this)
    }
    _T.prototype.values = function() {
        return Object.keys(this).map(item => this[item], this)
    }
    return _T
}

const Tnum = Tuple(Number, String)
const v = new Tnum(123, 'ssss')
let [num, str] = v.values()
console.log(num, str)