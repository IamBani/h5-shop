const http = require('http')
console.log(http.METHODS)

console.log(getCurrentNodeMethods() || getBasicNodeMethods())
function getCurrentNodeMethods () {
  return (
    http.METHODS &&
    http.METHODS.map(function lowerCaseMethod (method) {
      return method.toLowerCase()
    })
  )
}

function getBasicNodeMethods () {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ]
}
class Router {
  constructor (option = {}) {
    this.option = option
    this.methods = this.option.methods || [
      'HEAD',
      'OPTIONS',
      'GET',
      'PUT',
      'PATCH',
      'POST',
      'DELETE'
    ]
    this.params = {}
    this.stack = []
  }

  use () {

  }
}
