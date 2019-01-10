#!/usr/bin/env node
// Generate API docs from JSDoc in index.js using jsdoc2md
// Usage:
//   ./scripts/apidocs.js [outputFile]

const jsdoc2md = require('jsdoc-to-markdown')
const path = require('path')
const fs = require('fs')

let data = jsdoc2md.getTemplateDataSync({
	files: path.resolve(__dirname, '..', 'index.js')
})

data = data
	.filter(d => {
		const tags = d.customTags

		return tags && tags[0]
			&& tags[0].tag === 'api'
			&& tags[0].value === 'public'
	})

const output = jsdoc2md.renderSync({
	data,
	'heading-depth': 0,
	'example-lang': 'javascript',
	helper: path.resolve(__dirname, '..', 'helpers.jsdoc.js'),
	template: `
{{#globals kind="member" ~}}
{{#if @first~}}### Index
{{/if~}}
* {{>sig-link}}
{{/globals}}

---

{{#orphans ~}}
<a name="{{{anchorName}}}"></a>
{{#if name}}{{#sig~}}
{{#if @prefix}}{{@prefix}} {{/if~}}
#### {{name}}
{{#if @methodSign}}{{#if (isEvent)}} {{@methodSign}}{{else}}{{@methodSign}}{{/if}}{{/if~}}
{{~/sig}}{{/if~}}

{{>description~}}

* **Type:** {{#sig~}}{{#if @returnTypes}}{{>linked-type-list types=@returnTypes}}{{/if~}}{{~/sig}}
{{#if params~}}
{{#params}}* **Params:**
{{#each this}}
  * {{name}}{{#if type}} {{>linked-type-list types=type.names delimiter=" | " }}{{/if}}{{#if description}} {{{inlineLinks description}}}{{/if}}
{{/each~}}
{{/params~}}{{/if~}}
{{#if (hasAtLeastOneCustomTag "ref" customTags)~}}* **References:**
{{#each customTags~}}{{#if (equal tag "ref")}}  * {{{inlineLinks value}}}
{{/if~}}{{/each~}}
{{/if~}}
{{#examples}}
* **Example:**
{{{inlineLinks example}}}
{{/examples}}

{{>member-index~}}
{{>separator~}}
{{>members~}}
{{/orphans~}}
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
