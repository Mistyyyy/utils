const Functor = value => ({
  map: fn => Functor(fn(value)),
  valueOf: () => value,
  toString: () => `Functor(${value})`,
  [Symbol.iterator]: () => {
    let first = true;
    return ({
      next: () => {
        if (first) {
          first = false;
          return ({
            done: false,
            value
          })
        }
        return ({
          done: true
        })
      }
    })
  },
  constructor: Functor
})

const trace = x => {
  console.log(x)
  return x
}

const inc = x => x + 1
const double = x => x * 2

Functor(2).map(x => x * 2).map(trace)

Functor(5).map(x => double(inc(x))).map(trace)
Functor(5).map(inc).map(double).map(trace)

console.log(Functor(20) + Functor(4))

console.log([1,2,...Functor(3)])