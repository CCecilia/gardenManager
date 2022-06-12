export const getHeaders = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }

    const userStr = localStorage.getItem("user");
    let user = null;

    if (userStr) {
        user = JSON.parse(userStr);
    }

    if (user && user.accessToken) {
      Object.assign(headers, {Authorization: `Bearer ${user.accessToken}`});
    }

    return headers;
};