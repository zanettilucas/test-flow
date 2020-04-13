const querystring = require('querystring')
const http = require('follow-redirects').http
const https = require('follow-redirects').https
const logger = require('../services/loggerService')

const performRequest = (host, path, method, protocol, data) => {
  const dataString = JSON.stringify(data)
  let headers = {}
  if (method === 'GET') {
    path += `?${querystring.stringify(data)}`
  } else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
    }
  }
  const options = {
    host,
    path,
    method,
    headers,
  }
  return new Promise((resolve, reject) => {

    let httpActive = http
    if (protocol == 'https'){
      httpActive = https
    }
  
    const req = httpActive.request(options, (res) => {
      res.setEncoding('utf-8')
      let responseString = ''
      res.on('data', (dataRes) => {
        responseString += dataRes
      })

      res.on('end', () => {
        if (res.statusCode === 200) {
          const responseObject = JSON.parse(responseString)
          resolve(responseObject)
        } else {
          const e = {
            code: res.statusCode,
            message: res.statusMessage,
          }
          logger.warning(`${e.message}`, e)
          reject(e)
        }
      })
      res.on('error', (e) => {
        logger.error(`Error: ${e.message}`, e)
      })
    })
//    req.write(dataString)
    req.end()
  })
}

module.exports = { performRequest }
