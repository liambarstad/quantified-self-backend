class Res {
  constructor() {
    this.stat = 'you done goofed'
    this.body = 'done goofed up hard'
  }
  status(num) {
    this.stat = num
      return this
  }
  json(val) {
    this.body = val
      return this
  }
}

module.exports = new Res()
