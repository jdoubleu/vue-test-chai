// Helper functions for handlebars templates,
// which are used by jsdoc2md
const util = require('util')

/**
 * Assert any custom tag matches the expected tag name
 *
 * @param tagName
 * @param customTags
 * @returns {boolean}
 */
function hasAtLeastOneCustomTag(tagName, customTags) {
	if (!customTags || !Array.isArray(customTags)) {
		return false
	}

	let result = false
	customTags.forEach(tag => {
		if (tag.tag === tagName) {
			result = true
		}
	})

	return result
}

/**
 * returns a unique ID string suitable for use as an `href`.
 *
 * @this {identifier}
 * @returns {string}
 * @static
 * @category Returns string
 *
 * @see https://github.com/jsdoc2md/dmd/blob/master/helpers/ddata.js#L554
 */
function anchorName () {
	if (!this.id) throw new Error('[anchorName helper] cannot create a link without a id: ' + JSON.stringify(this))

	let name = this.name

	if (this.type && this.type.names) {
		name += '-' + this.type.names[0]
	}
	if (this.memberof) {
		name += '-' + this.memberof
	}

	return name
}

module.exports = {
	hasAtLeastOneCustomTag,
	anchorName
}

