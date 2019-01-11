# Chai plugin for Vue Test utils [![NPM version](https://img.shields.io/npm/v/vue-test-chai.svg?style=flat)](https://www.npmjs.com/package/vue-test-chai) [![Build Status](https://travis-ci.com/jdoubleu/vue-test-chai.svg?branch=master)](https://travis-ci.com/jdoubleu/vue-test-chai) 
This plugin adds assertions and language chains to [chai](https://www.chaijs.com/) for the [Vue Test Utils](https://vue-test-utils.vuejs.org/).

**Please note:** This package is in early development. Please create an issue, if you experience any bugs or if you are missing a feature.

## Why?
These custom assertions make your tests more readable and they provide better error messages in case of an error.

Example:
```JavaScript
const wrapper = mount(MyComponent)

// instead of
expect(wrapper.attributes().id).to.equal('foo')
expect(wrapper.isEmpty()).to.be.false
// in case of an error it would throw:
// 1. AssertionError: expected 'bar' to equal 'foo'
// 2. AssertionError: expected true to be false

// write
expect(wrapper).to.have.attributes('id').which.equals('foo')
expect(wrapper).not.to.be.empty
// in case of an error it would throw:
// 1. AssertionError: Wrapper attributes: expected { Object (class) } to have property 'id'
// 2. AssertionError: expected { Object () } not to be empty, but it was
``` 

## Installation
First install this package:
```shell
npm install --save-dev vue-test-chai
```

Then edit or create the setup script of your test runner (e.g. `setup.js`):
```JavaScript
const chai = require('chai')
const vueTestChai = require('vue-test-chai')

chai.use(vueTestChai)
```

You can include any file in mocha using the [`--require` flag](https://mochajs.org/#usage).

## Documentation
* [API Documentation](./docs/API.md)
