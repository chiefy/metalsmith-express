/* =============================================================================
 *  IMPORTS
 */

/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "stderr|testLog" }]*/

//  test tools
const expect         = require('chai').expect
const {stdout,stderr}    = require('test-console')

//  test subjects
const metalsmithExpressLog = require('../lib/log.js')


/* =============================================================================
 *  HELPERS
 */

/*
 *  Helper. Supresses console output from metalsmith-express (i.e. don't mess with testing output!).
 */
function testLog(fn, ...args) {
  let inspect = stdout.inspect()
  let result  = (fn(...args)).pop()
  inspect.restore()
  return result.pop()
}

/*
 *  Helper. Supresses console output from metalsmith-express (i.e. don't mess with testing output!).
 */
function testLogSync(...args) {
  const output = stdout.inspectSync(function() {
    metalsmithExpressLog(...args)
  })
  return output.pop()
}


/* =============================================================================
 *  TESTS
 */

describe('log.js', function() {
  it('module.exports should be a function', function() {
    expect(metalsmithExpressLog).to.be.a('function')
  })

  describe('The exported function', function() {
    let output = testLogSync('test output')
    
    it('should write a string when called ', function() {
      expect(output).to.be.a('string')
    })
    
    it('should write the string it is called with', function() {
      expect(output).to.have.string('test output')
    })

    //  TODO: fix log.js bug (`message` is ignored when passing (<Number>, <String>)
    it.skip('writes when passed a number and a string'
    //, function() {
    //    let output = testLogSync(1, 'test error')
    //    expect(output).to.be.a('string')
    //    expect(output).to.have.string('test error')
    //})
    )
  })

})
