// Helper functions for handlebars templates,
// which are used by jsdoc2md

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

module.exports = {
	hasAtLeastOneCustomTag
}

