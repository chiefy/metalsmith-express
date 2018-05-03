/* =============================================================================
 *  IMPORTS
 */

//  test tools
const expect = require('chai').expect

//  test subjects
const metalsmithExpressPlugin = require('../index.js')


/* =============================================================================
 *  TESTS
 */

describe('index.js', function() {
  it('module.exports should be a function', function() {
    expect(metalsmithExpressPlugin).to.be.a('function')
  })

  describe('The exported function', function() {
    let pluginFn

    before(async function() {
      pluginFn = await metalsmithExpressPlugin({'document_root':'.'})
    })

    it('should return the plugin function', function() {
      expect(pluginFn).to.be.a('function')
    })

    context('The plugin function', function() {
      it('should accept 3 arguments', function() {
        expect(pluginFn.length).to.equal(3)
      })
    })
  })

})
