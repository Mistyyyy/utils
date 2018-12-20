function cache(fn) {
  let cached = Object.create(null)
  return str => {
    return cached[str] || (cached[str] = fn(str))
  }
}

const camelize = cache(str => {
  const reg = /-(\w)/
  return str.replace(reg, (_,c) => c.toUpperCase())
})

const fib = cache(n => {
  const _fib = (result, n) => {
    const copyResult = [...result].reverse()
    const [first, second] = copyResult
    return n < 3
      ? [...result]
      : _fib([...result,first + second], --n)
  }
  return _fib([0,1], n)
})

