chai = require 'chai'
expect = chai.expect
co = require 'co'

describe 'test opening browser', ->
  it 'should open the browser', ->
    co ->
      # This is used when app is not an angular app.
      browser.ignoreSynchronization = true
      # browser get doesn't yield a promise
      browser.get('http://localhost:4000')
      # This does??
      title = yield browser.getTitle()
      expect(title).to.be.equal('Linux Simba')
