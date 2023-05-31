module.exports.response = (res = {},statusCode = 200) => {
	return {
		statusCode,
		body: JSON.stringify(res)
	}
}