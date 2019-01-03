const Vue = require('Vue')

const template = `<div class="myfunctionalcomponent">
    <p>This is a functional component. It may access properties from its parent. E.g.:</p>
    <p>The name in the parent is {{ props.name }}</p>
</div>`

module.exports = Vue.extend({
    name: 'MyFunctionalComponent',
    functional: true,
    template
})
