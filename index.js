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
}
