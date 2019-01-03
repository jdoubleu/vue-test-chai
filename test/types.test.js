const { mount, shallowMount } = require('@vue/test-utils')
const MyComponent = require('./fixtures/MyComponent')
const MyFunctionalComponent = require('./fixtures/MyFunctionalComponent')

const otherTypes = [
    'a String',
    42,
    5.5,
    false,
    { name: 'value' },
    ['a value'],
    function() {}
]

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
        [mount, shallowMount].forEach(mountFn => {
            describe(`using mount function: "${mountFn.name}"`, () => {
                const wrapper = mountFn(MyComponent)

                it('should detect type of a Wrapper', () => {
                    expect(wrapper).to.be.a.Wrapper
                })

                it('should detect type of a WrapperArray', () => {
                    const arr = wrapper.findAll('div')

                    expect(arr).to.be.a.WrapperArray
                })

                it('should not falsely detect another type as a Wrapper', () => {
                    otherTypes.forEach(t => {
                        expect(t, `expected "${typeof t}" not to be a Wrapper`).not.to.be.a.Wrapper
                    })
                })

                it('should not falsely detect another type as a WrapperArray', () => {
                    otherTypes.forEach(t => {
                        expect(t, `expected "${typeof t}" not to be a WrapperArray`).not.to.be.a.WrapperArray
                    })
                })
            })
        })
    })
})
