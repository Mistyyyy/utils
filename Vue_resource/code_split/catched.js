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