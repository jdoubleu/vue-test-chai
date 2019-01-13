const { Wrapper, WrapperArray } = require('@vue/test-utils')
const deepEql = require('deep-equal')

module.exports = function(chai, utils) {
    const Assertion = chai.Assertion

    // helper functions
    function isWrapper(obj) {
        return obj instanceof Wrapper
    }

    function isWrapperArray(obj) {
        return obj instanceof WrapperArray
    }

    function isErrorWrapper(obj) {
        return obj.constructor && obj.constructor.name === 'ErrorWrapper'
    }

    function isVueComponent(obj) {
        return obj.prototype
            && obj.prototype.constructor
            && obj.prototype.constructor.name === 'VueComponent'
    }

    function isVueFunctionalComponent(obj) {
        return isVueComponent(obj)
            && obj.options.functional
    }

    function isVue(obj) {
        // is vue component instance (vm)
        return obj.constructor
            && obj.constructor.name === 'VueComponent'
            && obj._isVue
    }

    function addTypeCheckProperty(propName, typeCheckMethod, typeDescription) {
        Assertion.addProperty(propName, function() {
            const obj = this._obj

            this.assert(
                typeCheckMethod(obj),
                `expected #{this} to be a ${typeDescription}`,
                `expected #{this} not to be a ${typeDescription}`,
                propName
            )
        })
    }

    function useDefaultChainableBehaviour(_super) {
        return function defaultBehaviour() {
            return _super.apply(this, arguments)
        }
    }

    // chai assertions

    /**
     * Vue Test Utils Wrapper
     * @namespace Wrapper
     * @api public
     */

    /**
     * Vue Test Utils WrapperArray
     * @namespace WrapperArray
     * @api public
     */

    /**
     * Type property VueComponent
     *
     * Check the type of the test subject
     *
     * @name VueComponent
     * @type property
     * @api public
     *
     * @example
     * expect(MyComponent).to.be.a.VueComponent
     *
     * @ref https://www.chaijs.com/api/bdd/#method_a
     */
    addTypeCheckProperty('VueComponent', isVueComponent, 'vue component')

    /**
     * Type property VueFunctionalComponent
     *
     * Check the type of the test subject
     *
     * @name VueFunctionalComponent
     * @type property
     * @api public
     *
     * @example
     * expect(MyComponent).to.be.a.VueFunctionalComponent
     *
     * @ref https://www.chaijs.com/api/bdd/#method_a
     */
    addTypeCheckProperty('VueFunctionalComponent', isVueFunctionalComponent, 'functional vue component')

    /**
     * Type property Wrapper
     *
     * Check the type of the test subject
     *
     * @name VueTestWrapper
     * @type property
     * @api public
     *
     * @example
     * expect(MyComponent).to.be.a.VueTestWrapper
     *
     * @ref https://www.chaijs.com/api/bdd/#method_a
     */
    addTypeCheckProperty('VueTestWrapper', isWrapper, 'vue test utils Wrapper')

    /**
     * Type property WrapperArray
     *
     * Check the type of the test subject
     *
     * @name VueTestWrapperArray
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper.findAll('div')).to.be.a.VueTestWrapperArray
     *
     * @ref https://www.chaijs.com/api/bdd/#method_a
     */
    addTypeCheckProperty('VueTestWrapperArray', isWrapperArray, 'vue test utils WrapperArray')

    /**
     * Type property ErrorWrapper
     *
     * Check the type of the test subject
     *
     * @name VueTestErrorWrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper.find('non-existing-tag')).to.be.an.VueTestErrorWrapper
     */
    addTypeCheckProperty('VueTestErrorWrapper', isErrorWrapper, 'vue test utils ErrorWrapper')

    /**
     * Type property for any wrapper (Wrapper, ErrorWrapper)
     *
     * Check the type of the test subject
     *
     * @name VueTestAnyWrapper
     * @type property
     * @api private
     *
     * @example
     * expect(wrapper).to.be.an.VueTestAnyWrapper
     * expect({}).not.to.be.an.VueTestAnyWrapper
     */
    Assertion.addProperty('VueTestAnyWrapper', function() {
        const obj = this._obj

        this.assert(
            isWrapper(obj) || isErrorWrapper(obj),
            'expected #{this} to be either Wrapper or ErrorWrapper',
            'expected #{this} to be neither Wrapper or ErrorWrapper'
        )
    })

    /**
     * @name Vue
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper.vm).to.be.vue
     *
     * @ref https://vuejs.org/v2/guide/instance.html#ad
     */
    Assertion.addProperty('Vue', function() {
        const obj = this._obj

        this.assert(
            isVue(obj),
            'expected #{this} to be a vue instance',
            'expected #{this} to be a vue instance'
        )
    })

    /**
     * Access vue-test-util's Wrapper vm
     *
     * All following chains will operate on the vm object
     *
     * @name vm
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).to.have.vm
     * expect(wrapper).to.have.vm.which.has.a.property('$data')
     * expect(wrapper).vm.to.have.property('$data')
     * expect(wrapper).vm.to.be.empty
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#properties
     */
    Assertion.addProperty('vm', function() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const vm = obj.vm

        new Assertion(vm).to.be.Vue

        utils.flag(this, 'object', vm)
    })

    /**
     * Access vue-test-util's Wrapper element
     *
     * All following chains will operate on the root DOM node of the wrapper
     *
     * @name element
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).to.have.an.element
     * expect(wrapper).element.to.be.a('HTMLElement')
     * expect(wrapper).element.to.have.property('innerText')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#properties
     */
    Assertion.addProperty('element', function() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const element = obj.element

        new Assertion(element).not.to.be.empty

        utils.flag(this, 'object', element)
    })

    /**
     * Access vue-test-util's Wrapper options
     *
     * @name option
     * @memberOf Wrapper
     * @type method
     * @param { string } name
     * @param { * } val (optional)
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.option('attachedToDocument')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#properties
     * @ref https://www.chaijs.com/api/bdd/#method_property
     */
    Assertion.addMethod('option', function(name, val, msg) {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const options = obj.options

        const optionsAssertion = new Assertion(options)
        utils.transferFlags(this, optionsAssertion, false)
        utils.flag(optionsAssertion, 'message', (msg ? msg + ': ' : '') + 'Wrapper options')

        return optionsAssertion.to.have.property(...arguments)
    })

    /**
     * Asserts the attributes of the DOM node from the vue-test-util Wrapper
     *
     * @name attributes
     * @memberOf Wrapper
     * @type method
     * @param { string } key name of the attribute
     * @param { * } val (optional)
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.attributes('id', 'foo')
     * expect(wrapper).to.have.attributes('id').which.is.a('string').and.equals('foo')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#attributes-key
     */
    function assertWrapperAttributes(key, val, msg) {
        const obj = this._obj

        const attributesAssertion = new Assertion(obj)
        utils.transferFlags(this, attributesAssertion, false)
        utils.flag(attributesAssertion, 'message', (msg ? msg + ': ' : '') + 'Wrapper attributes')

        return attributesAssertion.to.have.property(...arguments)
    }

    /**
     * Chain vue-test-utils Wrapper attributes
     *
     * @name attributes
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).to.have.attributes.which.has.a.property('id')
     * expect(wrapper).attributes.to.deep.equal({id: 'foo' })
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#attributes-key
     */
    function chainWrapperAttributes() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const attributes = obj.attributes()

        new Assertion(attributes).to.be.an('object')

        utils.flag(this, 'object', attributes)
    }

    Assertion.addChainableMethod('attributes', assertWrapperAttributes, chainWrapperAttributes)

    /**
     * Assert DOM node classes of the vue-test-util Wrapper
     *
     * @name classes
     * @memberOf Wrapper
     * @type method
     * @param { string|string[] } className (optional)
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.classes('some-class')
     * expect(wrapper).to.have.classes(['some-class', 'otherclass'])
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#classes-classname
     * @ref https://www.chaijs.com/api/bdd/#method_include
     */
    function assertWrapperClasses(className, msg) {
        utils.flag('message', (msg ? msg + ': ' : '') + 'Wrapper classes')
        const obj = this._obj

        function assertClassName(name) {
            new Assertion(obj).to.include(name)
        }

        if (Array.isArray(className)) {
            className.forEach(assertClassName)
        } else {
            assertClassName(className)
        }
    }

    /**
     * Chain vue-test-utils Wrapper's DOM node classes
     *
     * @name classes
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).classes.to.include('some-class')
     * expect(wrapper).to.have.classes.with.a.lengthOf(2)
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#classes-classname
     */
    function chainWrapperClasses() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const classes = obj.classes()

        new Assertion(classes).to.be.an('array')

        utils.flag(this, 'object', classes)
    }

    Assertion.addChainableMethod('classes', assertWrapperClasses, chainWrapperClasses)

    /**
     * Assert vue-test-utils Wrapper contains
     *
     * @name contains
     * @memberOf Wrapper
     * @type method
     * @param { string|Component } selector
     * @api public
     *
     * @example
     * expect(wrapper).that.contains('div')
     * expect(wrapper).to.contain('div')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#contains-selector
     * @ref https://www.chaijs.com/api/bdd/#method_include
     */
    function overwriteContainsAssertionForWrapper(_super) {
        return function assertWrapperContains(selector) {
            const obj = this._obj

            if (!isWrapper(obj)) {
                return _super.apply(this, arguments)
            }

            this.assert(
                true === obj.contains(selector),
                'expected #{this} to contain #{exp}',
                'expected #{this} not to contain #{exp}',
                selector
            )
        }
    }

    Assertion.overwriteChainableMethod('contain', overwriteContainsAssertionForWrapper, useDefaultChainableBehaviour)
    Assertion.overwriteChainableMethod('contains', overwriteContainsAssertionForWrapper, useDefaultChainableBehaviour)

    /**
     * Assert that the wrapped component emitted events
     *
     * @name emitted
     * @memberOf Wrapper
     * @type method
     * @param { string } eventName
     * @param { int } times (optional) how often the event should have been emitted
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.emitted('change')
     * expect(wrapper).not.to.have.emitted('change')
     * expect(wrapper).to.have.emitted('click', 7)
     * expect(wrapper).to.have.emitted('change').which.deep.contains({value: 'newValue'})
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#emitted
     */
    Assertion.addMethod('emitted', function(eventName, times, msg) {
        msg = msg ? msg + ':' : ''
        utils.flag('message', msg + 'Wrapper emitted')
        const obj = this._obj
        const negate = utils.flag(this, 'negate')

        new Assertion(obj).to.be.a.VueTestWrapper

        const events = obj.emitted()
        new Assertion(events).to.be.an('object')

        const assertEvent = new Assertion(events)
        if (times === 0 || (negate && !(times > 0))) {
            utils.flag(assertEvent, 'negate', true)
        }

        const prop = assertEvent.to.have.property(eventName)

        if (times > 0) {
            new Assertion(prop).to.be.ok

            const event = utils.flag(prop, 'object')

            this.assert(
                times === event.length,
                'expected ' + utils.inspect(eventName) + ' to have been emitted #{exp} times but was #{act}',
                'expected ' + utils.inspect(eventName) + ' to have not been emitted #{exp} times but was #{act}',
                times,
                event.length
            )
        }

        utils.flag(prop, 'message', msg + 'emitted events ' + utils.inspect(eventName))
        return prop
    })

    /**
     * Assert Wrapper has emitted the following events by order
     *
     * @name emittedByOrder
     * @memberOf Wrapper
     * @type method
     * @param { string[]|Array<{name: string, args: Array<*>}> } events
     * @param { int } offset (optional) default 0
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.emittedByOrder(['ready', 'change', 'destroyed'])
     * expect(wrapper).to.have.emittedByOrder(['change', 'destroyed'], 1)
     * expect(wrapper).to.have.emittedByOrder([{ name: 'change', args: [4] }])
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#emittedbyorder
     */
    Assertion.addMethod('emittedByOrder', function(events, offset, msg) {
        msg = msg ? msg + ': ' : ''
        offset = offset ? offset : 0
        const obj = this._obj
        const negate = utils.flag(this, 'negate')

        new Assertion(obj).to.be.a.VueTestWrapper

        const emittedByOrder = obj.emittedByOrder()

        new Assertion(emittedByOrder).to.be.an('array')

        const filteredEmitted = emittedByOrder.slice(offset)

        function prepareExpectedEventsMsg(expectedEvents) {
            return expectedEvents.map(event => typeof event === 'object' ? event : { name: event, args: '*' })
        }

        if (!negate) {
            this.assert(
                events.length <= filteredEmitted.length,
                msg + 'expected #{this} to have emitted #{exp} events, but was #{act}',
                msg + 'expected #{this} not to have emitted #{exp} events, but was #{act}',
                events.length,
                filteredEmitted.length
            )
        }

        let globalOutcome = true

        events.forEach((event, index) => {
            let actualEvent = filteredEmitted[index]

            let expectedEventName = event,
                expectedEventArgs

            if (typeof event === 'object') {
                expectedEventName = event.name
                expectedEventArgs = event.args
            }

            if (negate && !actualEvent) {
                actualEvent = {
                    name: false,
                    args: false
                }
            }

            let eventAssertion = expectedEventName === actualEvent.name
            if (expectedEventArgs) {
                eventAssertion = eventAssertion
                    && deepEql(actualEvent.args, expectedEventArgs)
            }

            if (!negate) {
                this.assert(
                    eventAssertion === true,
                    msg + 'expected #{this} to have emitted ' + utils.inspect(expectedEventName)
                        + ' at ' + utils.inspect(index) + ''
                        + (expectedEventArgs ? ' with args ' + utils.inspect(expectedEventArgs)
                            + ', but it has been emitted with ' + utils.inspect(actualEvent.args) : ''),
                    msg + 'expected #{this} not to have emitted ' + utils.inspect(expectedEventName)
                        + ' at ' + utils.inspect(index) + ''
                        + (expectedEventArgs ? ' with args ' + utils.inspect(expectedEventArgs)
                            + ', but it has been emitted with ' + utils.inspect(actualEvent.args) : ''),
                    prepareExpectedEventsMsg(events),
                    filteredEmitted,
                    true
                )
            } else {
                // one of all expected events has to be wrong
                globalOutcome = globalOutcome && eventAssertion === true
            }
        })

        if (negate) {
            this.assert(
                globalOutcome === true,
                msg + 'expected #{this} to have emitted #{exp} in order, but was #{act}',
                msg + 'expected #{this} not to have emitted #{exp} in order, but was #{act}',
                prepareExpectedEventsMsg(events),
                filteredEmitted
            )
        }
    })

    /**
     * Assert that the wrapper exists
     *
     * @name exists
     * @memberOf Wrapper
     * @type method
     * @api public
     *
     * @example
     * expect(wrapper).to.exists()
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#exists
     */
    function assertWrapperExists() {
        const obj = this._obj

        new Assertion(obj).to.be.VueTestAnyWrapper

        this.assert(
            obj.exists() === true,
            'expected #{this} to exist',
            'expected #{this} not to exist'
        )
    }

    Assertion.addMethod('exists', assertWrapperExists)

    /**
     * Same as method 'exists'
     *
     * @name exist
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).to.exist
     *
     * @ref * @ref https://www.chaijs.com/api/bdd/#method_exist
     */
    Assertion.overwriteProperty('exist', function(_super) {
        return function assertWrapperExist() {
            const obj = this._obj

            if (!isWrapper(obj) && !isErrorWrapper(obj)) {
                return _super.apply(this, arguments)
            }

            const assertion = new Assertion(obj)
            utils.transferFlags(this, assertion)
            assertion.to.exists()
        }
    })

    /**
     * Assert that the wrapper has a child matching the given selector which exists
     *
     * This method is chainable on the found element.
     *
     * @name find
     * @memberOf Wrapper
     * @type method
     * @param { string|Component } selector
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.find('div')
     * expect(wrapper).not.to.find('blockquote')
     * expect(wrapper).to.find('h1').which.has.attributes('id', 'page-heading')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#find-selector
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#exists
     */
    Assertion.addMethod('find', function(selector, msg) {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const el = obj.find(selector)

        const existAssertion = new Assertion(el)
        utils.transferFlags(this, existAssertion, false)
        utils.flag(existAssertion, 'message', (msg ? msg + ': ' : '') + 'expected #{this} to find ' + utils.inspect(selector))
        existAssertion.to.exists()

        utils.flag(this, 'object', el)
    })

    /**
     * Chain children of Wrapper as WrapperArray
     *
     * @name findAll
     * @memberOf Wrapper
     * @type method
     * @param { string|Component } selector
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).findAll('div').to.be.selector('div')
     * expect(wrapper).to.findAll('h1').which.has.a.wrapperAt(0).that.is.a.selector('h1')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#findall-selector
     */
    Assertion.addMethod('findAll', function(selector, msg) {
        msg = msg ? msg + ': ' : ''
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const elm = obj.findAll(selector)

        new Assertion(elm).to.be.a.VueTestWrapperArray

        this.assert(
            elm.length > 0,
            msg + 'expected #{this} to find at least one #{exp}',
            msg + 'expected #{this} not to find any #{exp}',
            selector
        )

        utils.flag(this, 'object', elm)
    })

    /**
     * Chain html of the wrapped DOM node
     *
     * @name html
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).html.not.to.be.empty
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#html
     */
    Assertion.addProperty('html', function() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        utils.flag(this, 'object', obj.html())
    })

    /**
     * Assert the Wrapper to be/match a selector
     *
     * @name isSelector
     * @memberOf Wrapper
     * @type method
     * @param { string } selector
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).isSelector('div')
     * expect(wrapper).to.be.selector(MyComponent)
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#is-selector
     */
    function assertWrapperIs(selector, msg) {
        msg = msg ? msg + ': ' : ''
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const result = obj.is(selector)

        this.assert(
            result === true,
            msg + 'expected #{this} to be #{exp}',
            msg + 'expected #{this} not to be #{exp}',
            selector
        )
    }

    Assertion.addMethod('isSelector', assertWrapperIs)
    Assertion.addMethod('selector', assertWrapperIs)

    // TODO: find better integration for selector (e.g. expect(wrapper).to.be('div'), .to.match.selector('div'), .to.be.a('div'))

    /**
     * Assert that the Wrapper does contain child nodes
     *
     * @name empty
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).not.to.be.empty
     * expect(wrapper).find('input').to.be.empty
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#isempty
     * @ref https://www.chaijs.com/api/bdd/#method_empty
     */
    Assertion.overwriteProperty('empty', function(_super) {
        return function assertWrapperEmpty() {
            const obj = this._obj

            if (!isWrapper(obj)) {
                return _super.apply(this, arguments)
            }

            this.assert(
                obj.isEmpty() === true,
                'expected #{this} to be empty, but was not',
                'expected #{this} not to be empty, but it was'
            )
        }
    })

    /**
     * Assert the Wrapper is visible
     *
     * @name visible
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).to.be.visible
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#isvisible
     */
    Assertion.addProperty('visible', function() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        this.assert(
            obj.isVisible() === true,
            'expected #{this} to be visible, but was not',
            'expected #{this} not to be visible, but was'
        )
    })

    /**
     * Assert Wrapper is a Vue instance
     *
     * @name VueInstance
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).to.be.a.VueInstance
     * expect(wrapper).find('button').not.to.be.a.VueInstance
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#isvueinstance
     */
    Assertion.addProperty('VueInstance', function() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        this.assert(
            obj.isVueInstance() === true,
            'expected #{this} to be a vue instance',
            'expected #{this} not to be a vue instance'
        )
    })

    /**
     * Assert Wrapper's name
     *
     * @name name
     * @memberOf Wrapper
     * @type method
     * @param { string } name
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.name('MyComponent')
     * expect(wrapper).find('.btn').to.have.name('button')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#name
     */
    function assertWrapperName(name, msg) {
        msg = msg ? msg + ': ' : ''
        const obj = this._obj

        this.assert(
            obj === name,
            msg + 'expected name to equal #{exp}, but was #{act}',
            msg + 'expected name not to equal #{exp}, but was #{act}',
            name,
            obj
        )
    }

    /**
     * Chain Wrapper's name
     *
     * @name name
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).name.to.equal('div')
     * expect(wrapper).name.to.contain('Component')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#name
     */
    function chainWrapperName() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        utils.flag(this, 'object', obj.name())
    }

    Assertion.addChainableMethod('name', assertWrapperName, chainWrapperName)

    /**
     * Assert that wrapper has prop
     *
     * @name props
     * @memberOf Wrapper
     * @type method
     * @param { string } key
     * @param { * } value (optional)
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.props('value', 1)
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#props-key
     * @ref https://www.chaijs.com/api/bdd/#method_property
     */
    function assertWrapperProps(key, value, msg) {
        const obj = this._obj

        const propsAssertion = new Assertion(obj)
        utils.transferFlags(this, propsAssertion, false)
        utils.flag(propsAssertion, 'message', (msg ? msg + ': ' : '') + 'Wrapper props')

        return propsAssertion.to.have.property(...arguments)
    }

    /**
     * Chain Wrapper's props
     *
     * @name props
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).props.to.have.property('value', 1)
     * expect(wrapper).props.to.deep.equal({value: 1})
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#props-key
     */
    function chainWrapperProps() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueInstance

        const props = obj.props()

        new Assertion(props).to.be.an('object')

        utils.flag(this, 'object', props)
    }

    Assertion.addChainableMethod('props', assertWrapperProps, chainWrapperProps)

    /**
     * Assert text content of Wrapper
     *
     * @name text
     * @memberOf Wrapper
     * @type method
     * @param { string } value
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapper).to.have.text('the content')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#text
     */
    function assertWrapperText(value, msg) {
        msg = msg ? msg + ': ' : ''
        const obj = this._obj

        this.assert(
            obj === value,
            msg + 'expected text to equal #{exp}, but was #{act}',
            msg + 'expected text not to equal #{exp}, but was #{act}',
            value,
            obj
        )
    }

    /**
     * Chain Wrapper's text
     *
     * @name text
     * @memberOf Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper).text.to.equal('the content')
     * expect(wrapper).text.to.contain('content')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#text
     */
    function chainWrapperText() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const text = obj.text()

        new Assertion(text).to.be.a('string')

        utils.flag(this, 'object', text)
    }

    Assertion.addChainableMethod('text', assertWrapperText, chainWrapperText)

    /**
     * Chain all wrappers contained in a WrapperArray
     *
     * @name wrappers
     * @memberOf WrapperArray
     * @type property
     * @api public
     *
     * @example
     * expect(wrapperArr).wrappers.not.to.be.empty
     * expect(wrapperArr).to.have.wrappers.with.a.lengthOf(2)
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper-array/#properties
     */
    Assertion.addProperty('wrappers', function() {
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapperArray

        const wrappers = obj.wrappers

        new Assertion(wrappers).to.be.an('array')

        utils.flag(this, 'object', wrappers)
    })

    /**
     * Chain Number of Wrappers contained in the WrapperArray
     *
     * @name length
     * @memberOf WrapperArray
     * @type property
     * @api public
     *
     * @example
     * expect(wrapperArr).wrappers.length.to.be.at.least(2)
     * expect(wrapperArr).wrappers.to.have.a.lengthOf(2)
     * expect(wrapperArr).length.to.be.at.least(2)
     * expect(wrapperArr).to.have.a.lengthOf(2)
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper-array/#properties
     */
    // eslint-disable-next-line no-unused-vars
    function chainWrapperArrayLength() {
        // This is a stub, because chai already supports length property access
        // @see https://www.chaijs.com/api/plugins/#method_addlengthguard
    }

    /**
     * Assert and chain a Wrapper at index in WrapperArray
     *
     * @name wrapperAt
     * @memberOf WrapperArray
     * @type method
     * @api public
     *
     * @example
     * expect(wrapperArr).to.have.a.wrapperAt(0)
     * expect(wrapperArr).wrapperAt(1).to.be.a.selector('div')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper-array/#at-index
     * @ref https://www.chaijs.com/api/bdd/#method_language-chains
     */
    Assertion.addMethod('wrapperAt', function(index) {
        new Assertion(index).to.be.a('number', 'index can only be a number')

        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapperArray

        try {
            const wrapper = obj.at(index)

            new Assertion(wrapper).to.be.a.VueTestWrapper

            utils.flag(this, 'object', wrapper)
        } catch(e) {
            throw new chai.AssertionError(
                'expected ' + utils.inspect(obj) + ' to have a Wrapper at ' + utils.inspect(index) + ': ' + e.message,
                { stack: e.stack }
            )
        }
    })

    /**
     * Assert every Wrapper in WrapperArray contains selector
     *
     * @name contains
     * @memberOf WrapperArray
     * @type method
     * @param { string|Component } selector
     * @api public
     *
     * @example
     * expect(wrapperArr).that.contains('div')
     * expect(wrapperArr).to.contain('div')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper-array/#contains-selector
     * @ref https://www.chaijs.com/api/bdd/#method_include
     */
    function overwriteContainsAssertionForWrapperArray(_super) {
        return function assertWrapperArrayContains(selector) {
            const obj = this._obj

            if (!isWrapperArray(obj)) {
                return _super.apply(this, arguments)
            }

            this.assert(
                true === obj.contains(selector),
                'expected #{this} to contain #{exp}',
                'expected #{this} not to contain #{exp}',
                selector
            )
        }
    }

    Assertion.overwriteChainableMethod('contain', overwriteContainsAssertionForWrapperArray, useDefaultChainableBehaviour)
    Assertion.overwriteChainableMethod('contains', overwriteContainsAssertionForWrapperArray, useDefaultChainableBehaviour)

    /**
     * Assert every Wrapper's DOM node or vm in WrapperArray to match selector
     *
     * @name isSelector
     * @memberOf WrapperArray
     * @type method
     * @param { string } selector
     * @param { string } msg (optional)
     * @api public
     *
     * @example
     * expect(wrapperArr).isSelector('div')
     * expect(wrapperArr).to.be.selector(MyComponent)
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper-array/#is-selector
     */
    function overwriteWrapperIsAssertionForWrapperArray(_super) {
        return function assertWrapperArrayIs(selector, msg) {
            msg = msg ? msg + ': ' : ''
            const obj = this._obj

            if (!isWrapperArray(obj)) {
                return _super.apply(this, arguments)
            }

            const result = obj.is(selector)

            this.assert(
                result === true,
                msg + 'expected #{this} to be #{exp}',
                msg + 'expected #{this} not to be #{exp}',
                selector
            )
        }
    }

    Assertion.overwriteMethod('isSelector', overwriteWrapperIsAssertionForWrapperArray)
    Assertion.overwriteMethod('selector', overwriteWrapperIsAssertionForWrapperArray)

    // TODO: find better integration for selector (e.g. expect(wrapperArr).to.be('div'), .to.match.selector('div'), .to.be.a('div'))

    /**
     * Assert every Wrapper in WrapperArray does not contain child node
     *
     * @name empty
     * @memberOf WrapperArray
     * @type property
     * @api public
     *
     * @example
     * expect(wrapperArr).not.to.be.empty
     * expect(otherArr).to.be.empty
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper-array/#isempty
     * @ref https://www.chaijs.com/api/bdd/#method_empty
     */
    Assertion.overwriteProperty('empty', function(_super) {
        return function assertWrapperEmpty() {
            const obj = this._obj

            if (!isWrapperArray(obj)) {
                return _super.apply(this, arguments)
            }

            this.assert(
                obj.isEmpty() === true,
                'expected #{this} to be empty, but was not',
                'expected #{this} not to be empty, but it was'
            )
        }
    })

    /**
     * Assert every Wrapper in WrapperArray is Vue instance.
     *
     * @name VueInstance
     * @memberOf WrapperArray
     * @type property
     * @api public
     *
     * @example
     * expect(wrapperArr).to.be.a.VueInstance
     * expect(otherArr).not.to.be.a.VueInstance
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper-array/#isvueinstance
     */
    Assertion.overwriteProperty('VueInstance', function(_super) {
        return function assertWrapperArrayIsVueInstance() {
            const obj = this._obj

            if (!isWrapperArray(obj)) {
                return _super.apply(this, arguments)
            }

            this.assert(
                obj.isVueInstance() === true,
                'expected all Wrappers in #{this} to be a VueInstance',
                'expected all Wrappers in #{this} not to be a VueInstance'
            )
        }
    })
}
