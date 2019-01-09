const { Wrapper, WrapperArray } = require('@vue/test-utils')

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
                `expected #{this} not to be a ${typeDescription}`
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
     * @type prop
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
        utils.flag('message', (msg ? msg + ': ' : '') + 'Wrapper options')
        const obj = this._obj

        new Assertion(obj).to.be.a.VueTestWrapper

        const options = obj.options

        return new Assertion(options).to.have.property(...arguments)
    })

    /**
     * Asserts the attributes of the DOM node from the vue-test-util Wrapper
     *
     * @name attributes
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
        utils.flag('message', (msg ? msg + ': ' : '') + 'Wrapper options')
        const obj = this._obj

        return new Assertion(obj).to.have.property(...arguments)
    }

    /**
     * Chain vue-test-utils Wrapper attributes
     *
     * @name attributes
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
     * @alias contain
     * @type method
     * @param { string|Component } el selector
     * @api public
     *
     * @example
     * expect(wrapper).that.contains('div')
     * expect(wrapper).to.contain('div')
     *
     * @ref https://vue-test-utils.vuejs.org/api/wrapper/#contains-selector
     * @ref https://www.chaijs.com/api/bdd/#method_include
     */
    function overwriteChainableAssertion(_super) {
        return function assertWrapperContains(el) {
            const obj = this._obj

            try {
                new Assertion(obj).to.be.a.VueTestWrapper

                this.assert(
                    true === obj.contains(el),
                    'expected #{this} to contain #{exp}',
                    'expected #{this} not to contain #{exp}',
                    el
                )
            } catch(e) {
                if (!(e instanceof chai.AssertionError)) {
                    throw e
                }

                _super.apply(this, arguments)
            }
        }
    }

    Assertion.overwriteChainableMethod('contain', overwriteChainableAssertion, useDefaultChainableBehaviour)
    Assertion.overwriteChainableMethod('contains', overwriteChainableAssertion, useDefaultChainableBehaviour)

    /**
     * Assert that the wrapped component emitted events
     *
     * @name emitted
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
}
