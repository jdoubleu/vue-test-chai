const Vue = require('vue')

const template = `<div class="mycomponent mycomponent__container">
    <h1>Hello {{ name }}</h1>
    <p v-if="github">Your GitHub profile is {{ github }}.</p>
    <p v-else>You do not have a GitHub profile.</p>
    <div class="counter">
        The current counter is: {{ counter }}
        <div>
            <label for="cinc">Counter increment:</label>
            <input id="cinc" type="number" min="1" max="5" v-model="counterIncrement"/>
            <button @click="handleCounterBtnClick">Increase counter by {{ counterIncrement }}</button>
        </div>
    </div>
</div>`

module.exports = Vue.extend({
    name: 'MyComponent',
    template,
    props: {
        name: String,
        github: {
            type: String,
            default: '',
            validate(url) {
                return url.beginsWith('https://github.com/')
            }
        }
    },
    data() {
        return {
            counter: 3,
            counterIncrement: 1
        }
    },
    methods: {
        handleCounterBtnClick() {
            this.counter += parseInt(this.counterIncrement)
        }
    }
})
