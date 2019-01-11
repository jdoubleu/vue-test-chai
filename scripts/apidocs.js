#!/usr/bin/env node
// Generate API docs from JSDoc in index.js using jsdoc2md
// Usage:
//   ./scripts/apidocs.js [outputFile]

const jsdoc2md = require('jsdoc-to-markdown')
const path = require('path')
const fs = require('fs')

let data = jsdoc2md.getTemplateDataSync({
	files: path.resolve(__dirname, '..', 'lib/vue-test-chai.js')
})

data = data
	.filter(d => {
		return d.customTags
			&& d.customTags.find(t => t.tag === 'api' && t.value === 'public')
	})

const output = jsdoc2md.renderSync({
	data,
	'example-lang': 'javascript',
	helper: path.resolve(__dirname, '..', 'helpers.jsdoc.js'),
	template: `### Index
{{#*inline "sig-link"}}
{{#if name}}{{#sig~}}
{{{@depOpen}~}}
[{{{@codeOpen}~}}
{{name}}
{{~#if @methodSign}}{{#if (isEvent)}} {{@methodSign}}{{else}}{{@methodSign}}{{/if}}{{/if~}}
{{{@codeClose}}}](#{{{anchorName}}})
{{~#if @returnSymbol}} {{@returnSymbol}}{{/if~}}
{{#if @returnTypes}} {{>linked-type-list types=@returnTypes delimiter=" \\| " }}{{/if~}}
{{{@depClose}~}}
{{~/sig}}{{/if~}}
{{/inline~}}

{{#*inline "member-index-grouped"}}
* {{name}}
{{#groupBy (option "group-by")}}
{{string-repeat "  " (add level 1)}}* {{>sig-link}}
{{/groupBy~}}
{{/inline~}}

{{#globals kind="member"~}}
* {{>sig-link}}
{{/globals~}}
{{#globals kind="namespace"}}
{{>member-index-grouped}}
{{/globals}}

---

{{#*inline "member-info"}}
{{#if name}}
#### {{#sig}}{{name}} {{#if @returnTypes}}{{>linked-type-list types=@returnTypes}}{{/if~}}{{/sig}}{{#if memberof}}, <code>{{memberof}}</code>{{/if}}
{{/if}}

{{>description~}}

* **Type:** {{#sig}}{{#if @returnTypes}}{{>linked-type-list types=@returnTypes}}{{/if}}{{/sig~}}
{{#if alias}}* **Alias:** {{alias}}{{/if}}
{{#if params}}{{#params}}* **Params:**
{{#each this}}
  * {{name}}{{#if type}} {{>linked-type-list types=type.names delimiter=" | " }}{{/if}}{{#if description}} {{{inlineLinks description}}}{{/if}}
{{/each~}}
{{/params~}}{{/if~}}
{{#if (hasAtLeastOneCustomTag "ref" customTags)}}* **References:**
{{#each customTags~}}{{#if (equal tag "ref")}}  * {{{inlineLinks value}}}
{{/if~}}{{/each~}}
{{/if~}}
{{#examples}}
* **Example:**
{{{inlineLinks example}}}
{{/examples}}

{{/inline~}}

{{#identifiers kind="member"~}}
{{>member-info}}
{{/identifiers}}
`
})

// write to file or stdout
let filePathArgsIndex = 1
if (process.argv[0].includes('node')) {
	filePathArgsIndex = 2
}

if (process.argv.length > filePathArgsIndex) {
	const filePath = process.argv[filePathArgsIndex]

	fs.writeFileSync(filePath, output)
} else {
	console.log(output)
}
