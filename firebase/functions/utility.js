
class InternalError extends Error {}

const throwError = (status, message) => {
  const error = new InternalError(message)
  error.status = status
  throw error
}

const defaultConfig = {
  allowedMethod: 'POST',
  allowEmptyBody: false,
  requiredKeys: []
}

const validateInput = (request, _config = defaultConfig) => {
  const config = Object.assign({}, defaultConfig, _config)
  if (request.method !== config.allowedMethod) {
    throwError(403, `Only ${config.allowedMethod} method is allowed.`)
  }
  const data = request.body
  if (!data && !config.allowEmptyBody) {
    throwError(400, 'Empty request body.')
  }
  for (const key of config.requiredKeys) {
    if (!data.hasOwnProperty(key)) {
      throwError(400, `Field '${key}' is missing.`)
    }
  }
  return data
}

module.exports = {
  throwError,
  validateInput
}
