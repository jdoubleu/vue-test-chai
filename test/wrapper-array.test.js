const { AssertionError } = require('chai')
const { mount, shallowMount } = require('@vue/test-utils')
const MyComponent = require('./fixtures/MyComponent')

function testExpectToThrowAssertionError(fn, msg) {
    it('should fail when subject is not a vue-test-utils WrapperArray' + (msg ? ': ' + msg : msg), () => {
        function testThrow() {
            fn(expect({}))
        }

        expect(testThrow).to.throw(AssertionError, 'vue test utils WrapperArray')
    })
}

describe('Vue test utils WrapperArray assertions tests', () => {
    [mount, shallowMount].forEach(mountFn => {
        describe(`using mount function: "${mountFn.name}"`, () => {
        	const wrapper = mountFn(MyComponent)
            const wrapperArr = wrapper.findAll('div')

            describe('wrappers property', () => {
                testExpectToThrowAssertionError(e => e.to.have.wrappers)

                it('should assert existing wrappers property', () => {
                    expect(wrapperArr).wrappers.not.to.be.empty
                    expect(wrapperArr).to.have.wrappers.with.a.lengthOf.at.least(2)
					expect(wrapper.findAll('blockquote')).wrappers.to.be.empty
                })
            })

			describe('length property', () => {
				it('should be able to access length property of wrappers', () => {
					expect(wrapperArr).wrappers.length.to.be.at.least(2).and.at.most(5)
				})

				it('should be able to access length property of WrapperArray', () => {
					expect(wrapperArr).length.to.be.at.least(2).and.at.most(5)
					expect(wrapperArr).to.have.a.lengthOf.at.least(2).and.at.most(5)
				})
			})
        })
    })
})
