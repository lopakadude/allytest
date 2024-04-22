const BASE_URL = "https://api.lopakadude.bitfilms.nomoreparties.co";

async function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(await res.json());
}

function request(endpoint, options) {
	return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse)
}

export const login = (inputValues) => {
	return request(`signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: inputValues.email,
			password: inputValues.password,
		}),
	})
		.then((data) => {
			if (data.token) {
				localStorage.setItem("jwt", data.token);
				return data;
			}
		})
};
