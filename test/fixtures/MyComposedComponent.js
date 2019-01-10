const Vue = require('vue')
const MyComponent = require('./MyComponent')

const template = `<div class="mycomposedcomponent composed-component">
    <MyComponent v-for="name in names" :key="name" :name="name"/>
</div>`

module.exports = Vue.extend({
    name: 'MyComposedComponent',
    template,
    components: {
        MyComponent
    },
    data() {
        return {
            names: [
                'Jane',
                'John',
                'Janett'
            ]
        }
    }
})
