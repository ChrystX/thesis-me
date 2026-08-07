export const validateLogin = ({ username, password }) => {
    if (!username || !password) {
        return 'Username and password are required';
    }
    return '';
};

export const validateRegister = ({
                                     username,
                                     email,
                                     password,
                                     confirmPassword
                                 }) => {
    if (!username || !email || !password) {
        return 'All fields are required';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    return '';
};
