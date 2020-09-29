// let orgid = 29
let BASE_Url,
	orgid
if (process.env.NODE_ENV === 'development') {
	BASE_Url = ''
	// BASE_Url = "https://app-auth.iqilu.com"
	orgid = 3 // test
} else {
	// BASE_Url = "https://app-auth.iqilu.com"
	BASE_Url = ''
	orgid = 3 // test
}

export default {
	BASE_Url,
	orgid
}
