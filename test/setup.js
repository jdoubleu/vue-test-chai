require('jsdom-global')()

const chai = require('chai')
const vueTestChai = require('../lib/vue-test-chai.js')

chai.use(vueTestChai)

global.expect = chai.expect
