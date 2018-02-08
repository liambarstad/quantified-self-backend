const build_response = (response, config = { stat: 200, err_code: 404 }) => {
  return this.then(result => {
    if (result) {
      return response.status(config.stat).json(result)
    } else {
      return response.status(config.err_code)
    }
  })
  .catch(err => {
    return response.status(config.err_code)
  })
}

//const build_response = (result, response, config = { stat: 200, err_code: 404 }) => {
  //if (result) {
    //return response.status(config.stat).json(result)
  //} else {
    //return response.status(config.err_code)
  //}
//}

module.exports = { build_response }
