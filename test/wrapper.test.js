const { AssertionError } = require('chai')
const { mount, shallowMount } = require('@vue/test-utils')
const MyComponent = require('./fixtures/MyComponent')

function testExpectToThrowAssertionError(fn, expectedErrorMsg, msg) {
    if (!expectedErrorMsg) {
        expectedErrorMsg = 'vue test utils Wrapper'
    }

    it('should fail when subject is not a vue-test-utils Wrapper' + (msg ? ': ' + msg : ''), () => {
        function testThrow() {
            fn(expect({}))
        }

        expect(testThrow).to.throw(AssertionError, expectedErrorMsg)
    })
}

function w(fn) {
    return function() {
        [mount, shallowMount].forEach(mountFn => {
            const defaultWrapper = mountFn(MyComponent)

            fn(defaultWrapper, mountFn)
        })
    }
}

describe('Vue test utils Wrapper assertions tests', () => {
    describe('vm property', () => {
        testExpectToThrowAssertionError(e => e.to.have.a.vm)

        it('should assert existing vm property', w(wrapper => {
            expect(wrapper).to.have.vm
        }))

        it('should be able to access properties of vm', w(wrapper => {
                expect(wrapper).vm.to.have.property('$data')
        }))
    })

    describe('element property', () => {
        testExpectToThrowAssertionError(e => e.to.have.an.element)

        it('should assert existing element property', w(wrapper => {
            expect(wrapper).to.have.an.element
        }))

        it('should be a HTMLElement', w(wrapper => {
            expect(wrapper).element.to.be.an.instanceOf(window.HTMLElement)
        }))
    })

    describe('options property', () => {
        testExpectToThrowAssertionError(e => e.to.have.option('some'))

        it('should assert default options', w(wrapper => {
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
        }))
    })

    describe('attributes', () => {
        testExpectToThrowAssertionError(e => e.to.have.attributes('some'))

        it('should assert DOM node attributes', w(wrapper => {
            expect(wrapper).to.have.attributes('class')
            expect(wrapper).to.have.attributes('class', 'mycomponent mycomponent__container')
            expect(wrapper).to.have.attributes('class').which.is.a('string').and.equals('mycomponent mycomponent__container')
            expect(wrapper).not.to.have.attributes('data-info')
        }))

        it('should chain DOM node attributes', w(wrapper => {
            expect(wrapper).to.have.attributes.which.has.a.property('class').which.is.a('string')
            expect(wrapper).to.have.attributes.which.has.a.property('class', 'mycomponent mycomponent__container')
            expect(wrapper).attributes.to.deep.equal({'class': 'mycomponent mycomponent__container'})
            expect(wrapper).attributes.not.to.have.property('data-info')
        }))
    })

    describe('classes', () => {
        testExpectToThrowAssertionError(e => e.to.have.classes('some'))

        it('should assert DOM node classes', w(wrapper => {
            expect(wrapper).to.have.classes('mycomponent')
            expect(wrapper).to.have.classes('mycomponent__container')
            expect(wrapper).to.have.classes(['mycomponent', 'mycomponent__container'])
        }))

        it('should chain DOM node classes', w(wrapper => {
            expect(wrapper).to.have.classes
            expect(wrapper).to.have.classes.with.a.lengthOf(2)
            expect(wrapper).classes.to.include('mycomponent')
        }))
    })

    describe('contains', () => {
        it('should assert Wrapper contains', w(wrapper => {
            expect(wrapper).that.contains('div')
            expect(wrapper).to.contain('div')
        }))

        it('should assert default behaviour', () => {
            expect(['first', 2]).to.contain(2)
            expect(['first', 2]).not.to.contain('div')
        })
    })

    describe('emitted', () => {
        testExpectToThrowAssertionError(e => e.to.have.emitted('some'))

        it('should assert emitted events', w(wrapper => {
            expect(wrapper).to.have.emitted('change', 0)
            expect(wrapper).not.to.have.emitted('change')
            wrapper.vm.handleCounterBtnClick()
            expect(wrapper).to.have.emitted('change')
            expect(wrapper).to.have.emitted('change', 1)
            expect(wrapper).not.to.have.emitted('change', 2)
            expect(wrapper).to.have.emitted('change').which.deep.contains([4])
        }))
    })

    describe('emittedByOrder', () => {
        testExpectToThrowAssertionError(e => e.to.have.emittedByOrder(['some']))

        it('should assert emittedByOrder events by names', w(wrapper => {
            expect(wrapper).to.have.emittedByOrder([])
            expect(wrapper).not.to.have.emittedByOrder(['change'])

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder(['change'])
            expect(wrapper).not.to.have.emittedByOrder(['ready'])
            expect(wrapper).not.to.have.emittedByOrder(['change', 'change'])

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder(['change', 'change'])
            expect(wrapper).not.to.have.emittedByOrder(['ready', 'change'])
            expect(wrapper).not.to.have.emittedByOrder(['change', 'change', 'change'])
        }))

        it('should assert emittedByOrder events by names with offset', w(wrapper => {
            expect(wrapper).to.have.emittedByOrder([], 0)
            expect(wrapper).to.have.emittedByOrder([], 1)

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder(['change'])
            expect(wrapper).to.have.emittedByOrder(['change'], 0)
            expect(wrapper).not.to.have.emittedByOrder(['change'], 1)

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder(['change'], 1)

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder(['change'], 2)
            expect(wrapper).to.have.emittedByOrder(['change', 'change'], 1)
            expect(wrapper).not.to.have.emittedByOrder(['change', 'change'], 2)
        }))

        it('should assert emittedByOrder events with args', w(wrapper => {
            expect(wrapper).not.to.have.emittedByOrder([{ name: 'change', args: [4]}])

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder([{ name: 'change', args: [4]}])
            expect(wrapper).not.to.have.emittedByOrder([{ name: 'change', args: [999]}])

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder(['change', { name: 'change', args: [5]}])
            expect(wrapper).to.have.emittedByOrder([{ name: 'change', args: [4]}, 'change'])
            expect(wrapper).to.have.emittedByOrder([{ name: 'change', args: [4]}, { name: 'change', args: [5]}])
            expect(wrapper).not.to.have.emittedByOrder([{ name: 'change', args: [999]}, 'change'])
        }))

        it('should assert emittedByOrder events with args and offset', w(wrapper => {
            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder([{ name: 'change', args: [4]}], 0)
            expect(wrapper).not.to.have.emittedByOrder([{ name: 'change', args: [4]}], 1)

            wrapper.vm.handleCounterBtnClick()

            expect(wrapper).to.have.emittedByOrder([{ name: 'change', args: [5]}], 1)
            expect(wrapper).not.to.have.emittedByOrder([{ name: 'change', args: [5]}], 0)
            expect(wrapper).not.to.have.emittedByOrder([{ name: 'change', args: [999]}], 1)
        }))
    })

    describe('exists', () => {
        testExpectToThrowAssertionError(e => e.to.have.exists(), 'be either Wrapper or ErrorWrapper')

        it('should assert that the wrapper exists', w(wrapper => {
            expect(wrapper).to.exists()
            expect(wrapper.find('blockquote')).not.to.exists()
        }))

        it('should assert using "exist" property', w(wrapper => {
            expect(wrapper).to.exist
            expect(wrapper.find('blockquote')).not.to.exist
        }))
    })

    describe('find', () => {
        testExpectToThrowAssertionError(e => e.to.have.find('some'))

        it('should assert that the wrapper has children', w(wrapper => {
            expect(wrapper).to.find('div')
            expect(wrapper).to.find('#cinc')
        }))

        it('should assert that the wrapper has not specific children', w(wrapper => {
            expect(wrapper).not.to.find('blockquote')
        }))

        it('should be able to chain the #find() method', w(wrapper => {
            expect(wrapper).to.find('h1').which.has.attributes('id', 'heading')
        }))
    })

    describe('findAll', () => {
        testExpectToThrowAssertionError(e => e.to.have.findAll('some'))

        it('should assert that the wrapper has children', w(wrapper => {
            expect(wrapper).to.findAll('div')
            expect(wrapper).to.findAll('#cinc')
        }))

        it('should assert that the wrapper has not specific children', w(wrapper => {
            expect(wrapper).not.to.findAll('blockquote')
        }))

        it('should be able to chain the #findAll() method', w(wrapper => {
            expect(wrapper).to.findAll('h1').which.has.a.wrapperAt(0).that.is.a.selector('h1')
        }))
    })

    describe('html', () => {
        testExpectToThrowAssertionError(e => e.html)

        it('should be able to chain the html', w(wrapper => {
            expect(wrapper).html.not.to.be.empty
        }))
    })

    describe('isSelector', () => {
        testExpectToThrowAssertionError(e => e.isSelector('some'))

        it('should assert that the wrapper is a div', w(wrapper => {
            expect(wrapper).isSelector('div')
            expect(wrapper).isSelector(MyComponent)
            expect(wrapper).to.be.selector('div')
            expect(wrapper).to.be.selector(MyComponent)
        }))
    })

    describe('empty', () => {
        it('should assert that wrapper is not empty', w(wrapper => {
            expect(wrapper).not.to.be.empty
        }))

        it('should assert that input#cinc is empty', w(wrapper => {
            expect(wrapper).find('#cinc').to.be.empty
        }))
    })

    describe('visible', () => {
        testExpectToThrowAssertionError(e => e.to.be.visible)

        it('should assert that wrapper is visible', w(wrapper => {
            expect(wrapper).to.be.visible
        }))

        it('should assert that hidden-element is not visible', w(wrapper => {
            expect(wrapper).find('.hidden-element').not.to.be.visible
        }))
    })

    describe('name', () => {
        testExpectToThrowAssertionError(e => e.name)

        it('should assert name of wrapper and elements', w(wrapper => {
            expect(wrapper).to.have.name('MyComponent')
            expect(wrapper).not.to.have.name('OtherComponent')
            expect(wrapper).find('#cinc').to.have.name('input')
            expect(wrapper).find('#cinc').not.to.have.name('button')
        }))

        it('should be able to chain the name', w(wrapper => {
            expect(wrapper).name.to.equal('MyComponent')
            expect(wrapper).name.not.to.equal('OtherComponent')
            expect(wrapper).name.to.contain('Component')
        }))
    })

    describe('props', () => {
        testExpectToThrowAssertionError(e => e.props)

        it('should assert props of wrapper', w(wrapper => {
            expect(wrapper).to.have.props('name')
            expect(wrapper).to.have.props('github', '')
            expect(wrapper).not.to.have.props('twitter')
        }))

        it('should be able to chain wrapper props', w(wrapper => {
            expect(wrapper).props.to.have.property('name')
            expect(wrapper).props.to.have.property('github', '')
            expect(wrapper).props.not.to.have.property('twitter')
        }))
    })

    describe('text', () => {
        testExpectToThrowAssertionError(e => e.text)

        it('should assert text content of wrapper', w(wrapper => {
            const label = wrapper.find('label')

            expect(label).to.have.text('Counter increment:')
            expect(label).not.to.have.text('Counter decrement:')
        }))

        it('should be able to chain text content of wrapper', w(wrapper => {
            expect(wrapper).text.to.contain('Hello')
            expect(wrapper).text.not.to.contain('Bye')
        }))
    })
})
