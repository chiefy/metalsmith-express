/* =============================================================================
 *  IMPORTS
 */

/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "stderr" }]*/

//  test tools
const expect = require('chai').expect
const {stdout,stderr} = require('test-console')

//  test subjects
const metalsmithExpressServer = require('../lib/server.js')


/* =============================================================================
 *  TESTS
 */

describe('server.js', function() {
  let serverController
  
  it('module.exports should be a function', function() {
    expect(metalsmithExpressServer).to.be.a('function')
  })

  describe('The exported function', function() {
    before(function startServer() {
      //  The server itself is not externally accessible;
      //  this function just returns a plain object containing
      //  `start()` and `stop()` controls.
      let suppressOutput = stdout.ignore()
      serverController = metalsmithExpressServer({'document_root': '.'})
      serverController.start( suppressOutput )
    })
    after(function stopServer() {
      let suppressOutput = stdout.ignore()
      serverController.stop( suppressOutput )
    })

    it('should return an object', function() {
      expect(serverController).to.be.an('object')
    })

    describe('The returned object', function() {
      it('should have `start()`', function() {
        expect(serverController).to.have.property('start')
        expect(serverController.start).to.be.a('function')
      })

      it('should have `stop()`', function() {
        expect(serverController).to.have.property('stop')
        expect(serverController.stop).to.be.a('function')
      })
    })
  })

})
