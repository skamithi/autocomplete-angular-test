chai = require 'chai'
expect = chai.expect
co = require 'co'

before ->
  # This is used when app is not an angular app.
  browser.ignoreSynchronization = true
  # browser get doesn't yield a promise
  browser.get('http://localhost:4000')

after ->
  browser.close()

describe 'website title', ->
  it 'should be be something like Linux simba', ->
    co ->
      # this issues a promise?
      title = yield browser.getTitle()
      expect(title).to.be.equal('Linux Simba')

describe 'navigate somewhere', ->
  it 'should actually work yah!', ->
    links = element.all(By.css('.post-header-home a'))
    links.get(1).click()
    co ->
     title = yield browser.getTitle()
     expect(title).to.be.equal('Openstack - Fails to create VM due to Qemu Error | Linux Simba')

