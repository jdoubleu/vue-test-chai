const { AssertionError } = require('chai')
const { mount, shallowMount } = require('@vue/test-utils')
const MyComponent = require('./fixtures/MyComponent')

function testExpectToThrowAssertionError(fn, msg) {
    it('should fail when subject is not a vue-test-utils WrapperArray' + (msg ? ': ' + msg : ''), () => {
        function testThrow() {
            fn(expect({}))
        }

        expect(testThrow).to.throw(AssertionError, 'vue test utils WrapperArray')
    })
}

function w(fn) {
    return function() {
        [mount, shallowMount].forEach(mountFn => {
            const defaultWrapper = mountFn(MyComponent)
			const defaultWrapperArr = defaultWrapper.findAll('div')

            fn(defaultWrapper, defaultWrapperArr, mountFn)
        })
    }
}

describe('Vue test utils WrapperArray assertions tests', () => {
    describe('wrappers property', () => {
		testExpectToThrowAssertionError(e => e.to.have.wrappers)

		it('should assert existing wrappers property', w((wrapper, wrapperArr) => {
			expect(wrapperArr).wrappers.not.to.be.empty
			expect(wrapperArr).to.have.wrappers.with.a.lengthOf.at.least(2)
			expect(wrapper.findAll('blockquote')).wrappers.to.be.empty
		}))
	})

	describe('length property', () => {
		it('should be able to access length property of wrappers', w((_, wrapperArr) => {
			expect(wrapperArr).wrappers.length.to.be.at.least(2).and.at.most(5)
		}))

		it('should be able to access length property of WrapperArray', w((_, wrapperArr) => {
			expect(wrapperArr).length.to.be.at.least(2).and.at.most(5)
			expect(wrapperArr).to.have.a.lengthOf.at.least(2).and.at.most(5)
		}))
	})

	describe('at method', () => {
		testExpectToThrowAssertionError(e => e.wrapperAt(1))

		it('should fail if index is not a number', w((_, wrapperArr) => {
			expect(function() {
				expect(wrapperArr).wrapperAt('some')
			}).to.throw(AssertionError, 'number')
		}))

		it('should throw error if index not found', w((_, wrapperArr) => {
			expect(function() {
				expect(wrapperArr).wrapperAt(999)
			}).to.throw('no item exists at')
		}))

		it('should assert that WrapperArray has a Wrapper at 0', w((_, wrapperArr) => {
			expect(wrapperArr).to.have.a.wrapperAt(0)
		}))

		it('should chain a Wrapper', w((_, wrapperArr) => {
			expect(wrapperArr).wrapperAt(1).to.be.a.VueTestWrapper
			expect(wrapperArr).wrapperAt(0).to.be.a.selector('div')
		}))
	})

	describe('contains method', () => {
		it('should assert WrapperArray contains only divs', w((_, wrapperArr) => {
			expect(wrapperArr).that.contains('div')
			expect(wrapperArr).to.contain('div')
		}))

		it('should assert default behaviour', () => {
			expect(['first', 2]).to.contain(2)
			expect(['first', 2]).not.to.contain('div')
		})
	})

	describe('isSelector', () => {
		it('should assert that the WrapperArray is a div', w((_, wrapperArr) => {
			expect(wrapperArr).isSelector('div')
			expect(wrapperArr).to.be.selector('div')
		}))
	})

	describe('empty', () => {
		it('should assert that WrapperArray is not empty', w((_, wrapperArr) => {
			expect(wrapperArr).not.to.be.empty
		}))

		it('should assert that WrapperArray of blockquote is empty', w(wrapper => {
			const otherArr = wrapper.findAll('#cinc')

			expect(otherArr).to.be.empty
		}))

		it('should throw error when WrapperArray is empty', w(wrapper => {
			const otherArr = wrapper.findAll('blockquote')

			expect(function() {
				expect(otherArr).empty
			}).to.throw('isEmpty cannot be called on 0 items')
		}))
	})
})
