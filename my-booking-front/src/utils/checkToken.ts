export const checkToken = (token: string | null) => {
    if (!token) {
        return false;
    }

    try {
        const tokenData = JSON.parse(atob(token.split(".")[1]));

        if (tokenData.exp) {
            const expirationTime = tokenData.exp * 1000;
            return expirationTime > Date.now();
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
};
