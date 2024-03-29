import axios from 'axios'

export function addtocart(c, q, p) {
	axios
		.get(`http://localhost:8000/addtocart?q=${q}&c_id=${c}&p_id=${p}`)
		.then((response) => {
			this.res = response.data
			return true
		})
		.catch((error) => {
			console.error('Error fetching data:', error)
			return false
		})
}
