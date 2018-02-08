const build_response = (result, response, config = { stat: 200, err_code: 404 }) => {
  if (result) {
    return response.status(config.stat).json(result)
  } else {
    return response.status(config.err_code)
  }
}

module.exports = { build_response }
