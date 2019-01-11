### Index
* [VueComponent](#VueComponent-property) : <code>property</code>
* [VueFunctionalComponent](#VueFunctionalComponent-property) : <code>property</code>
* [VueTestWrapper](#VueTestWrapper-property) : <code>property</code>
* [VueTestWrapperArray](#VueTestWrapperArray-property) : <code>property</code>
* [VueTestErrorWrapper](#VueTestErrorWrapper-property) : <code>property</code>
* [Vue](#Vue-property) : <code>property</code>
* Wrapper
  * [vm](#vm-property-Wrapper) : <code>property</code>
  * [element](#element-property-Wrapper) : <code>property</code>
  * [option](#option-method-Wrapper) : <code>method</code>
  * [attributes](#attributes-method-Wrapper) : <code>method</code>
  * [attributes](#attributes-property-Wrapper) : <code>property</code>
  * [classes](#classes-method-Wrapper) : <code>method</code>
  * [classes](#classes-property-Wrapper) : <code>property</code>
  * [contains](#contains-method-Wrapper) : <code>method</code>
  * [emitted](#emitted-method-Wrapper) : <code>method</code>
  * [emittedByOrder](#emittedByOrder-method-Wrapper) : <code>method</code>
  * [exists](#exists-method-Wrapper) : <code>method</code>
  * [exist](#exist-property-Wrapper) : <code>property</code>
  * [find](#find-method-Wrapper) : <code>method</code>
  * [findAll](#findAll-method-Wrapper) : <code>method</code>
  * [html](#html-property-Wrapper) : <code>property</code>
  * [isSelector](#isSelector-method-Wrapper) : <code>method</code>
  * [empty](#empty-property-Wrapper) : <code>property</code>
  * [visible](#visible-property-Wrapper) : <code>property</code>
  * [VueInstance](#VueInstance-property-Wrapper) : <code>property</code>
  * [name](#name-method-Wrapper) : <code>method</code>
  * [name](#name-property-Wrapper) : <code>property</code>
  * [props](#props-method-Wrapper) : <code>method</code>
  * [props](#props-property-Wrapper) : <code>property</code>
  * [text](#text-method-Wrapper) : <code>method</code>
  * [text](#text-property-Wrapper) : <code>property</code>
* WrapperArray
  * [wrappers](#wrappers-property-WrapperArray) : <code>property</code>
  * [length](#length-property-WrapperArray) : <code>property</code>
  * [wrapperAt](#wrapperAt-method-WrapperArray) : <code>method</code>
  * [contains](#contains-method-WrapperArray) : <code>method</code>
  * [isSelector](#isSelector-method-WrapperArray) : <code>method</code>
  * [empty](#empty-property-WrapperArray) : <code>property</code>
  * [VueInstance](#VueInstance-property-WrapperArray) : <code>property</code>

---

#### VueComponent <code>property</code>

Type property VueComponent

Check the type of the test subject

* **Type:** <code>property</code>
* **References:**
  * https://www.chaijs.com/api/bdd/#method_a
* **Example:**
```javascript
expect(MyComponent).to.be.a.VueComponent
```

#### VueFunctionalComponent <code>property</code>

Type property VueFunctionalComponent

Check the type of the test subject

* **Type:** <code>property</code>
* **References:**
  * https://www.chaijs.com/api/bdd/#method_a
* **Example:**
```javascript
expect(MyComponent).to.be.a.VueFunctionalComponent
```

#### VueTestWrapper <code>property</code>

Type property Wrapper

Check the type of the test subject

* **Type:** <code>property</code>
* **References:**
  * https://www.chaijs.com/api/bdd/#method_a
* **Example:**
```javascript
expect(MyComponent).to.be.a.VueTestWrapper
```

#### VueTestWrapperArray <code>property</code>

Type property WrapperArray

Check the type of the test subject

* **Type:** <code>property</code>
* **References:**
  * https://www.chaijs.com/api/bdd/#method_a
* **Example:**
```javascript
expect(wrapper.findAll('div')).to.be.a.VueTestWrapperArray
```

#### VueTestErrorWrapper <code>property</code>

Type property ErrorWrapper

Check the type of the test subject

* **Type:** <code>property</code>
* **Example:**
```javascript
expect(wrapper.find('non-existing-tag')).to.be.an.VueTestErrorWrapper
```

#### Vue <code>property</code>

* **Type:** <code>property</code>
* **References:**
  * https://vuejs.org/v2/guide/instance.html#ad
* **Example:**
```javascript
expect(wrapper.vm).to.be.vue
```

#### vm <code>property</code>, <code>Wrapper</code>

Access vue-test-util's Wrapper vm

All following chains will operate on the vm object

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#properties
* **Example:**
```javascript
expect(wrapper).to.have.vm
expect(wrapper).to.have.vm.which.has.a.property('$data')
expect(wrapper).vm.to.have.property('$data')
expect(wrapper).vm.to.be.empty
```

#### element <code>property</code>, <code>Wrapper</code>

Access vue-test-util's Wrapper element

All following chains will operate on the root DOM node of the wrapper

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#properties
* **Example:**
```javascript
expect(wrapper).to.have.an.element
expect(wrapper).element.to.be.a('HTMLElement')
expect(wrapper).element.to.have.property('innerText')
```

#### option <code>method</code>, <code>Wrapper</code>

Access vue-test-util's Wrapper options

* **Type:** <code>method</code>
* **Params:**
  * name <code>string</code>
  * val <code>\*</code> (optional)
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#properties
  * https://www.chaijs.com/api/bdd/#method_property
* **Example:**
```javascript
expect(wrapper).to.have.option('attachedToDocument')
```

#### attributes <code>method</code>, <code>Wrapper</code>

Asserts the attributes of the DOM node from the vue-test-util Wrapper

* **Type:** <code>method</code>
* **Params:**
  * key <code>string</code> name of the attribute
  * val <code>\*</code> (optional)
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#attributes-key
* **Example:**
```javascript
expect(wrapper).to.have.attributes('id', 'foo')
expect(wrapper).to.have.attributes('id').which.is.a('string').and.equals('foo')
```

#### attributes <code>property</code>, <code>Wrapper</code>

Chain vue-test-utils Wrapper attributes

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#attributes-key
* **Example:**
```javascript
expect(wrapper).to.have.attributes.which.has.a.property('id')
expect(wrapper).attributes.to.deep.equal({id: 'foo' })
```

#### classes <code>method</code>, <code>Wrapper</code>

Assert DOM node classes of the vue-test-util Wrapper

* **Type:** <code>method</code>
* **Params:**
  * className <code>string</code> | <code>Array.&lt;string&gt;</code> (optional)
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#classes-classname
  * https://www.chaijs.com/api/bdd/#method_include
* **Example:**
```javascript
expect(wrapper).to.have.classes('some-class')
expect(wrapper).to.have.classes(['some-class', 'otherclass'])
```

#### classes <code>property</code>, <code>Wrapper</code>

Chain vue-test-utils Wrapper's DOM node classes

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#classes-classname
* **Example:**
```javascript
expect(wrapper).classes.to.include('some-class')
expect(wrapper).to.have.classes.with.a.lengthOf(2)
```

#### contains <code>method</code>, <code>Wrapper</code>

Assert vue-test-utils Wrapper contains

* **Type:** <code>method</code>
* **Params:**
  * selector <code>string</code> | <code>Component</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#contains-selector
  * https://www.chaijs.com/api/bdd/#method_include
* **Example:**
```javascript
expect(wrapper).that.contains('div')
expect(wrapper).to.contain('div')
```

#### emitted <code>method</code>, <code>Wrapper</code>

Assert that the wrapped component emitted events

* **Type:** <code>method</code>
* **Params:**
  * eventName <code>string</code>
  * times <code>int</code> (optional) how often the event should have been emitted
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#emitted
* **Example:**
```javascript
expect(wrapper).to.have.emitted('change')
expect(wrapper).not.to.have.emitted('change')
expect(wrapper).to.have.emitted('click', 7)
expect(wrapper).to.have.emitted('change').which.deep.contains({value: 'newValue'})
```

#### emittedByOrder <code>method</code>, <code>Wrapper</code>

Assert Wrapper has emitted the following events by order

* **Type:** <code>method</code>
* **Params:**
  * events <code>Array.&lt;string&gt;</code> | <code>Array.&lt;{name: string, args: Array.&lt;\*&gt;}&gt;</code>
  * offset <code>int</code> (optional) default 0
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#emittedbyorder
* **Example:**
```javascript
expect(wrapper).to.have.emittedByOrder(['ready', 'change', 'destroyed'])
expect(wrapper).to.have.emittedByOrder(['change', 'destroyed'], 1)
expect(wrapper).to.have.emittedByOrder([{ name: 'change', args: [4] }])
```

#### exists <code>method</code>, <code>Wrapper</code>

Assert that the wrapper exists

* **Type:** <code>method</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#exists
* **Example:**
```javascript
expect(wrapper).to.exists()
```

#### exist <code>property</code>, <code>Wrapper</code>

Same as method 'exists'

* **Type:** <code>property</code>
* **References:**
  * * @ref https://www.chaijs.com/api/bdd/#method_exist
* **Example:**
```javascript
expect(wrapper).to.exist
```

#### find <code>method</code>, <code>Wrapper</code>

Assert that the wrapper has a child matching the given selector which exists

This method is chainable on the found element.

* **Type:** <code>method</code>
* **Params:**
  * selector <code>string</code> | <code>Component</code>
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#find-selector
  * https://vue-test-utils.vuejs.org/api/wrapper/#exists
* **Example:**
```javascript
expect(wrapper).to.find('div')
expect(wrapper).not.to.find('blockquote')
expect(wrapper).to.find('h1').which.has.attributes('id', 'page-heading')
```

#### findAll <code>method</code>, <code>Wrapper</code>

Chain children of Wrapper as WrapperArray

* **Type:** <code>method</code>
* **Params:**
  * selector <code>string</code> | <code>Component</code>
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#findall-selector
* **Example:**
```javascript
expect(wrapper).findAll('div').to.be.selector('div')
expect(wrapper).to.findAll('h1').which.has.a.wrapperAt(0).that.is.a.selector('h1')
```

#### html <code>property</code>, <code>Wrapper</code>

Chain html of the wrapped DOM node

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#html
* **Example:**
```javascript
expect(wrapper).html.not.to.be.empty
```

#### isSelector <code>method</code>, <code>Wrapper</code>

Assert the Wrapper to be/match a selector

* **Type:** <code>method</code>
* **Params:**
  * selector <code>string</code>
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#is-selector
* **Example:**
```javascript
expect(wrapper).isSelector('div')
expect(wrapper).to.be.selector(MyComponent)
```

#### empty <code>property</code>, <code>Wrapper</code>

Assert that the Wrapper does contain child nodes

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#isempty
  * https://www.chaijs.com/api/bdd/#method_empty
* **Example:**
```javascript
expect(wrapper).not.to.be.empty
expect(wrapper).find('input').to.be.empty
```

#### visible <code>property</code>, <code>Wrapper</code>

Assert the Wrapper is visible

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#isvisible
* **Example:**
```javascript
expect(wrapper).to.be.visible
```

#### VueInstance <code>property</code>, <code>Wrapper</code>

Assert Wrapper is a Vue instance

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#isvueinstance
* **Example:**
```javascript
expect(wrapper).to.be.a.VueInstance
expect(wrapper).find('button').not.to.be.a.VueInstance
```

#### name <code>method</code>, <code>Wrapper</code>

Assert Wrapper's name

* **Type:** <code>method</code>
* **Params:**
  * name <code>string</code>
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#name
* **Example:**
```javascript
expect(wrapper).to.have.name('MyComponent')
expect(wrapper).find('.btn').to.have.name('button')
```

#### name <code>property</code>, <code>Wrapper</code>

Chain Wrapper's name

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#name
* **Example:**
```javascript
expect(wrapper).name.to.equal('div')
expect(wrapper).name.to.contain('Component')
```

#### props <code>method</code>, <code>Wrapper</code>

Assert that wrapper has prop

* **Type:** <code>method</code>
* **Params:**
  * key <code>string</code>
  * value <code>\*</code> (optional)
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#props-key
  * https://www.chaijs.com/api/bdd/#method_property
* **Example:**
```javascript
expect(wrapper).to.have.props('value', 1)
```

#### props <code>property</code>, <code>Wrapper</code>

Chain Wrapper's props

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#props-key
* **Example:**
```javascript
expect(wrapper).props.to.have.property('value', 1)
expect(wrapper).props.to.deep.equal({value: 1})
```

#### text <code>method</code>, <code>Wrapper</code>

Assert text content of Wrapper

* **Type:** <code>method</code>
* **Params:**
  * value <code>string</code>
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#text
* **Example:**
```javascript
expect(wrapper).to.have.text('the content')
```

#### text <code>property</code>, <code>Wrapper</code>

Chain Wrapper's text

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper/#text
* **Example:**
```javascript
expect(wrapper).text.to.equal('the content')
expect(wrapper).text.to.contain('content')
```

#### wrappers <code>property</code>, <code>WrapperArray</code>

Chain all wrappers contained in a WrapperArray

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper-array/#properties
* **Example:**
```javascript
expect(wrapperArr).wrappers.not.to.be.empty
expect(wrapperArr).to.have.wrappers.with.a.lengthOf(2)
```

#### length <code>property</code>, <code>WrapperArray</code>

Chain Number of Wrappers contained in the WrapperArray

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper-array/#properties
* **Example:**
```javascript
expect(wrapperArr).wrappers.length.to.be.at.least(2)
expect(wrapperArr).wrappers.to.have.a.lengthOf(2)
expect(wrapperArr).length.to.be.at.least(2)
expect(wrapperArr).to.have.a.lengthOf(2)
```

#### wrapperAt <code>method</code>, <code>WrapperArray</code>

Assert and chain a Wrapper at index in WrapperArray

* **Type:** <code>method</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper-array/#at-index
  * https://www.chaijs.com/api/bdd/#method_language-chains
* **Example:**
```javascript
expect(wrapperArr).to.have.a.wrapperAt(0)
expect(wrapperArr).wrapperAt(1).to.be.a.selector('div')
```

#### contains <code>method</code>, <code>WrapperArray</code>

Assert every Wrapper in WrapperArray contains selector

* **Type:** <code>method</code>
* **Params:**
  * selector <code>string</code> | <code>Component</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper-array/#contains-selector
  * https://www.chaijs.com/api/bdd/#method_include
* **Example:**
```javascript
expect(wrapperArr).that.contains('div')
expect(wrapperArr).to.contain('div')
```

#### isSelector <code>method</code>, <code>WrapperArray</code>

Assert every Wrapper's DOM node or vm in WrapperArray to match selector

* **Type:** <code>method</code>
* **Params:**
  * selector <code>string</code>
  * msg <code>string</code> (optional)
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper-array/#is-selector
* **Example:**
```javascript
expect(wrapperArr).isSelector('div')
expect(wrapperArr).to.be.selector(MyComponent)
```

#### empty <code>property</code>, <code>WrapperArray</code>

Assert every Wrapper in WrapperArray does not contain child node

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper-array/#isempty
  * https://www.chaijs.com/api/bdd/#method_empty
* **Example:**
```javascript
expect(wrapperArr).not.to.be.empty
expect(otherArr).to.be.empty
```

#### VueInstance <code>property</code>, <code>WrapperArray</code>

Assert every Wrapper in WrapperArray is Vue instance.

* **Type:** <code>property</code>
* **References:**
  * https://vue-test-utils.vuejs.org/api/wrapper-array/#isvueinstance
* **Example:**
```javascript
expect(wrapperArr).to.be.a.VueInstance
expect(otherArr).not.to.be.a.VueInstance
```

