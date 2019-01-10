const { AssertionError } = require('chai')
const { mount, shallowMount } = require('@vue/test-utils')
const MyComponent = require('./fixtures/MyComponent')
const MyFunctionalComponent = require('./fixtures/MyFunctionalComponent')
const MyComposedComponent = require('./fixtures/MyComposedComponent')

const otherTypes = [
    'a String',
    42,
    5.5,
    false,
    { name: 'value' },
    ['a value'],
    function() {}
]

function w(fn) {
    return function() {
        [mount, shallowMount].forEach(mountFn => {
            const defaultWrapper = mountFn(MyComponent)
			const defaultWrapperArr = defaultWrapper.findAll('div')

            fn(defaultWrapper, defaultWrapperArr, mountFn)
        })
    }
}

describe('Testing types (properties)', () => {
    describe('of vue components', () => {
        it('should detect type of a vue component', () => {
            expect(MyComponent).to.be.a.VueComponent
        })

        it('should detect type of a vue functional component', () => {
            expect(MyFunctionalComponent).to.be.a.VueFunctionalComponent
        })

        it('should not falsely detect another type as a vue component', () => {
            otherTypes.forEach(t => {
                expect(t, `expected "${typeof t}" not to be a vue component`).not.to.be.a.VueComponent
            })
        })

        it('should not falsely detect another type as a vue functional component', () => {
            otherTypes.forEach(t => {
                expect(t, `expected "${typeof t}" not to be a vue functional component`).not.to.be.a.VueFunctionalComponent
            })
        })
    })

    describe('of vue-test-util\'s Wrapper and WrapperArray', () => {
        it('should detect type of a Wrapper', w(wrapper => {
            expect(wrapper).to.be.a.VueTestWrapper
        }))

        it('should detect type of a WrapperArray', w(wrapper => {
            const arr = wrapper.findAll('div')

            expect(arr).to.be.a.VueTestWrapperArray
        }))

        it('should detect type of an ErrorWrapper', w(wrapper => {
            const non = wrapper.find('non-existing-tag')

            expect(non).to.be.an.VueTestErrorWrapper
        }))

        it('should detect type of an any wrapper', w(wrapper => {
            expect(wrapper).to.be.VueTestAnyWrapper
            expect(wrapper.find('non-existing')).to.be.VueTestAnyWrapper
        }))

        it('should assert wrapper to be a VueInstance', w(wrapper => {
            expect(wrapper).to.be.a.VueInstance
        }))

        it('should assert WrapperArray has only VueInstances', w((_, __, mountFn) => {
            const otherArr = mountFn(MyComposedComponent).findAll(MyComponent)

            expect(otherArr).to.be.a.VueInstance
        }))

        it('should assert wrapped DOM element is not a VueInstance', w(wrapper => {
            const el = wrapper.find('button')

            expect(el).not.to.be.a.VueInstance
        }))

        it('should assert WrapperArray not only has VueInstances', w(wrapper => {
            const arr = wrapper.findAll('div')

            expect(arr).not.to.be.a.VueInstance
        }))

        it('should throw error if wrapper is not a Wrapper', () => {
            expect(function() {
                expect({}).to.be.a.VueInstance
            }).to.throw(AssertionError)
        })

        it('should throw error if wrapper is not any wrapper', () => {
            expect(function() {
                expect({}).to.be.VueTestAnyWrapper
            }).to.throw(AssertionError)
        })

        it('should not falsely detect another type as a Wrapper', () => {
            otherTypes.forEach(t => {
                expect(t, `expected "${typeof t}" not to be a Wrapper`).not.to.be.a.VueTestWrapper
            })
        })

        it('should not falsely detect another type as a WrapperArray', () => {
            otherTypes.forEach(t => {
                expect(t, `expected "${typeof t}" not to be a WrapperArray`).not.to.be.a.VueTestWrapperArray
            })
        })

        it('should not falsely detect another type as a WrapperArray', () => {
            otherTypes.forEach(t => {
                expect(t, `expected "${typeof t}" not to be a WrapperArray`).not.to.be.a.VueTestErrorWrapper
            })
        })
    })

    describe('of vue instances', () => {
        it('should detect vue instance', w(wrapper => {
            expect(wrapper.vm).to.be.Vue
            expect(wrapper.vm).to.be.a.Vue
        }))
    })
})
