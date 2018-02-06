const build_response = (result, response, config = { stat: 200, err_code: 404 }) => {
  if (result) {
    return result.status(config.stat).json(result['rows'])
  } else {
    return result.status(config.err_code)
  }
}

module.exports = { build_response }
