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
     * @name Wrapper
     * @type property
     * @api public
     *
     * @example
     * expect(MyComponent).to.be.a.Wrapper
     *
     * @ref https://www.chaijs.com/api/bdd/#method_a
     */
    addTypeCheckProperty('VueTestWrapper', isWrapper, 'vue test utils Wrapper')

    /**
     * Type property WrapperArray
     *
     * Check the type of the test subject
     *
     * @name WrapperArray
     * @type property
     * @api public
     *
     * @example
     * expect(wrapper.findAll('div')).to.be.a.WrapperArray
     *
     * @ref https://www.chaijs.com/api/bdd/#method_a
     */
    addTypeCheckProperty('VueTestWrapperArray', isWrapperArray, 'vue test utils WrapperArray')

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
}
