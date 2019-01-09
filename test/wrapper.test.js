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

            describe('options property', () => {
                it('should fail when subject is not a vue-test-utils Wrapper', () => {
                    expect(function() {
                        expect({}).to.have.option('some')
                    }).to.throw()
                })

                it('should assert default options', () => {
                    const defaultOptions = {
                        'attachedToDocument': false,
                        'sync': true
                    }

                    Object.entries(defaultOptions).forEach(([name, value]) => {
                        expect(wrapper).to.have.option(name)
                        expect(wrapper).to.have.option(name, value)
                        expect(wrapper).to.have.option(name).which.is.a('boolean')
                    })
                })
            })

            describe('attributes', () => {
                it('should fail when subject is not a vue-test-utils Wrapper', () => {
                    expect(function() {
                        expect({}).to.have.attributes('some')
                    }).to.throw()
                })

                it('should assert DOM node attributes', () => {
                    expect(wrapper).to.have.attributes('class')
                    expect(wrapper).to.have.attributes('class', 'mycomponent mycomponent__container')
                    expect(wrapper).to.have.attributes('class').which.is.a('string').and.equals('mycomponent mycomponent__container')
                })

                it('should chain DOM node attributes', () => {
                    expect(wrapper).to.have.attributes.which.has.a.property('class').which.is.a('string')
                    expect(wrapper).to.have.attributes.which.has.a.property('class', 'mycomponent mycomponent__container')
                    expect(wrapper).attributes.to.deep.equal({'class': 'mycomponent mycomponent__container'})
                })
            })

            describe('classes', () => {
                it('should fail when subject is not a vue-test-utils Wrapper', () => {
                    expect(function() {
                        expect({}).to.have.classes('some')
                    }).to.throw()
                })

                it('should assert DOM node classes', () => {
                    expect(wrapper).to.have.classes('mycomponent')
                    expect(wrapper).to.have.classes('mycomponent__container')
                    expect(wrapper).to.have.classes(['mycomponent', 'mycomponent__container'])
                })

                it('should chain DOM node classes', () => {
                    expect(wrapper).to.have.classes
                    expect(wrapper).to.have.classes.with.a.lengthOf(2)
                    expect(wrapper).classes.to.include('mycomponent')
                })
            })

            describe('contains', () => {
                it('should assert Wrapper contains', () => {
                    expect(wrapper).that.contains('div')
                    expect(wrapper).to.contain('div')
                })

                it('should assert default behaviour', () => {
                    expect(['first', 2]).to.contain(2)
                    expect(['first', 2]).not.to.contain('div')
                })
            })
        })
    })
})
