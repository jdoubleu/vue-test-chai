const Vue = require('vue')

module.exports = Vue.extend({
    name: 'MyFunctionalComponent',
    functional: true,
    render(h, { props }) {
        return h('div', {
            staticClass: 'myfunctionalcomponent'
        }, [
            h('p', 'This is a functional component. It can render props without maintaining a state.'),
            h('p', 'You choose to greet: ' + props.name)
        ])
    }
})
