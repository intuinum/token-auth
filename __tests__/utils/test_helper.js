const post = async (api, data, status, endpoint) => {
    const { body } = await api
        .post(endpoint)
        .send(data)
        .expect(status);

    return body;
}

const register = async (api, data, status) => {
    return await post(api, data, status, '/api/user/register');
}

const login = async (api, data, status) => {
    return await post(api, data, status, '/api/user/login')
}

module.exports = { register, login }