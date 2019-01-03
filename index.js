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

    function useDefaultBehaviour(_super) {
        return function defaultBehaviour() {
            _super.apply(this, arguments)
        }
    }

    // chai assertions

    /**
     * Add vue specific types to chai's default a and an method
     *
     * Supported types are:
     * - Wrapper - vue-test-utils Wrapper
     * - WrapperArray
     * - VueComponent
     * - VueFunctionalComponent (is also a VueComponent)
     * - Vue instance
     *
     * @name a
     * @type method
     * @param String type Expected type of the test subject
     *
     * @example
     * expect(myWrapper).to.be.a('Wrapper')
     * expect(TheComponent).to.be.a('VueComponent)
     * expect(someObj).to.not.be.a('VueComponent')
     *
     * @ref https://www.chaijs.com/api/bdd/#method_a
     */
    Assertion.overwriteChainableMethod('a', function(_super) {
        return function vueTypesCheck(type) {
            const obj = this._obj

            switch(type) {
            case 'Wrapper':
                this.assert(
                    isWrapper(obj),
                    'expected #{this} to be a vue-test-utils Wrapper',
                    'expected #{this} to not be a vue-test-utils Wrapper'
                )

                break
            case 'WrapperArray':
                this.assert(
                    isWrapperArray(obj),
                    'expected #{this} to be a vue-test-utils WrapperArray',
                    'expected #{this} to not be a vue-test-utils WrapperArray'
                )

                break
            case 'VueComponent':
                this.assert(
                    isVueComponent(obj),
                    'expected #{this} to be a vue component',
                    'expected #{this} to not be a vue component'
                )

                break
            case 'VueFunctionalComponent':
                this.assert(
                    isVueFunctionalComponent(obj),
                    'expected #{this} to be a functional vue component',
                    'expected #{this} not to be a functional vue component'
                )

                break
            default:
                _super.apply(this, arguments)
            }
        }
    }, useDefaultBehaviour)
}
