module.exports = class ResponseHelper {
  constructor(config={}) {
    this.success_code = config.success_code || 200
    this.error_code = config.error_code || 404
    this.int_error_code = config.int_error_code || this.error_code
  }

  execute(callback, response, args=[]) {
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    return callback(...args)
      .then(result => {
        return this._buildSuccessful(result, response)
      })
      .catch(err => {
        return response.status(this.int_error_code).send('Invalid')
      })
  }

  _buildSuccessful(result, response) {
    if (result) {
      return response.status(this.success_code).json(result)
    } else {
      return response.status(this.error_code).send('Invalid')
    }
  }

}

