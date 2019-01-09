const { AssertionError } = require('chai')
const { mount, shallowMount } = require('@vue/test-utils')
const MyComponent = require('./fixtures/MyComponent')

function testExpectToThrowAssertionError(fn, msg) {
    it('should fail when subject is not a vue-test-utils Wrapper' + (msg ? ': ' + msg : msg), () => {
        expect(fn).to.throw(AssertionError)
    })
}

describe('Vue test utils Wrapper assertions tests', () => {
    [mount, shallowMount].forEach(mountFn => {
        describe(`using mount function: "${mountFn.name}"`, () => {
            const wrapper = mountFn(MyComponent)

            describe('vm property', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.vm)

                it('should assert existing vm property', () => {
                    expect(wrapper).to.have.vm
                })

                it('should be able to access properties of vm', () => {
                    expect(wrapper).vm.to.have.property('$data')
                })
            })

            describe('element property', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.an.element)

                it('should assert existing element property', () => {
                    expect(wrapper).to.have.an.element
                })

                it('should be a HTMLElement', () => {
                    expect(wrapper).element.to.be.an.instanceOf(window.HTMLElement)
                })
            })

            describe('options property', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.option('some'))

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

                    expect(wrapper).not.to.have.option('someOption')
                })
            })

            describe('attributes', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.attributes('some'))

                it('should assert DOM node attributes', () => {
                    expect(wrapper).to.have.attributes('class')
                    expect(wrapper).to.have.attributes('class', 'mycomponent mycomponent__container')
                    expect(wrapper).to.have.attributes('class').which.is.a('string').and.equals('mycomponent mycomponent__container')
                    expect(wrapper).not.to.have.attributes('data-info')
                })

                it('should chain DOM node attributes', () => {
                    expect(wrapper).to.have.attributes.which.has.a.property('class').which.is.a('string')
                    expect(wrapper).to.have.attributes.which.has.a.property('class', 'mycomponent mycomponent__container')
                    expect(wrapper).attributes.to.deep.equal({'class': 'mycomponent mycomponent__container'})
                    expect(wrapper).attributes.not.to.have.property('data-info')
                })
            })

            describe('classes', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.classes('some'))

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

            describe('emitted', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.emitted('some'))

                it('should assert emitted events', () => {
                    expect(wrapper).to.have.emitted('change', 0)
                    expect(wrapper).not.to.have.emitted('change')
                    wrapper.vm.handleCounterBtnClick()
                    expect(wrapper).to.have.emitted('change')
                    expect(wrapper).to.have.emitted('change', 1)
                    expect(wrapper).not.to.have.emitted('change', 2)
                    expect(wrapper).to.have.emitted('change').which.deep.contains([4])
                })
            })

            describe('exists', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.exists())

                it('should assert that the wrapper exists', () => {
                    expect(wrapper).to.exists()
                    expect(wrapper.find('blockquote')).not.to.exists()
                })

                it('should assert using "exist" property', () => {
                    expect(wrapper).to.exist
                    expect(wrapper.find('blockquote')).not.to.exist
                })
            })

            describe('find', () => {
                testExpectToThrowAssertionError(() => expect({}).to.have.find('some'))

                it('should assert that the wrapper has children', () => {
                    expect(wrapper).to.find('div')
                    expect(wrapper).to.find('#cinc')
                })

                it('should be able to chain the #find() method', () => {
                    expect(wrapper).to.find('h1').which.has.attributes('id', 'heading')
                })
            })

            describe('html', () => {
                testExpectToThrowAssertionError(() => expect({}).html)

                it('should be able to chain the html', () => {
                    expect(wrapper).html.not.to.be.empty
                })
            })

            describe('isSelector', () => {
                testExpectToThrowAssertionError(() => expect({}).isSelector('some'))

                it('should assert that the wrapper is a div', () => {
                    expect(wrapper).isSelector('div')
                    expect(wrapper).isSelector(MyComponent)
                    expect(wrapper).to.be.selector('div')
                    expect(wrapper).to.be.selector(MyComponent)
                })
            })

            describe('empty', () => {
                it('should assert that wrapper is not empty', () => {
                    expect(wrapper).not.to.be.empty
                })

                it('should assert that input#cinc is empty', () => {
                    expect(wrapper).find('#cinc').to.be.empty
                })
            })

            describe('visible', () => {
                testExpectToThrowAssertionError(() => expect({}).to.be.visible)

                it('should assert that wrapper is visible', () => {
                    expect(wrapper).to.be.visible
                })

                it('should assert that hidden-element is not visible', () => {
                    expect(wrapper).find('.hidden-element').not.to.be.visible
                })
            })

            describe('name', () => {
                testExpectToThrowAssertionError(() => expect({}).name)

                it('should assert name of wrapper and elements', () => {
                    expect(wrapper).to.have.name('MyComponent')
                    expect(wrapper).not.to.have.name('OtherComponent')
                    expect(wrapper).find('#cinc').to.have.name('input')
                    expect(wrapper).find('#cinc').not.to.have.name('button')
                })

                it('should be able to chain the name', () => {
                    expect(wrapper).name.to.equal('MyComponent')
                    expect(wrapper).name.not.to.equal('OtherComponent')
                    expect(wrapper).name.to.contain('Component')
                })
            })

            describe('props', () => {
                testExpectToThrowAssertionError(() => expect({}).props)

                it('should assert props of wrapper', () => {
                    expect(wrapper).to.have.props('name')
                    expect(wrapper).to.have.props('github', '')
                    expect(wrapper).not.to.have.props('twitter')
                })

                it('should be able to chain wrapper props', () => {
                    expect(wrapper).props.to.have.property('name')
                    expect(wrapper).props.to.have.property('github', '')
                    expect(wrapper).props.not.to.have.property('twitter')
                })
            })
        })
    })
})
