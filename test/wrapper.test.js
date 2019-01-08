const { mount, shallowMount } = require('@vue/test-utils')
const MyComponent = require('./fixtures/MyComponent')

describe('Vue test utils Wrapper assertions tests', () => {
    [mount, shallowMount].forEach(mountFn => {
        describe(`using mount function: "${mountFn.name}"`, () => {
            const wrapper = mountFn(MyComponent)

            describe('vm property', () => {
                it('should fail when subject is not a vue-test-utils Wrapper', () => {
                    expect(function() {
                        expect({}).to.have.vm
                    }).to.throw()
                })

                it('should assert existing vm property', () => {
                    expect(wrapper).to.have.vm
                })

                it('should be able to access properties of vm', () => {
                    expect(wrapper).vm.to.have.property('$data')
                })
            })

            describe('element property', () => {
                it('should fail when subject is not a vue-test-utils Wrapper', () => {
                    expect(function() {
                        expect({}).to.have.an.element
                    }).to.throw()
                })

                it('should assert existing element property', () => {
                    expect(wrapper).to.have.an.element
                })

                it('should be a HTMLElement', () => {
                    expect(wrapper).element.to.be.an.instanceOf(window.HTMLElement)
                })
            })
        })
    })
})
