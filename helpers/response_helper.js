const pry = require('pryjs')
module.exports = class ResponseHelper {
  constructor(config={}) {
    this.success_code = config.success_code || 200
    this.error_code = config.error_code || 404
    this.int_error_code = config.int_error_code || 500
  }

  execute(callback, response, args=[]) {
    return callback(...args)
      .then(result => {
        return this._buildSuccessful(result, response)
      })
      .catch(err => {
        console.log('it really goofed doe')
        return response.status(this.int_error_code)
      })
  }

  _buildSuccessful(result, response) {
    if (result) {
      return response.status(this.success_code).json(result)
    } else {
      return response.status(this.error_code)
    }
  }

}

