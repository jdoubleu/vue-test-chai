require('jsdom-global')()

const chai = require('chai')
const vueTestChai = require('../index')

chai.use(vueTestChai)

global.expect = chai.expect
