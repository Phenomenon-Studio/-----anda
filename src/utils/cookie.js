export const getCookie = name => {
    const matches = document.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`)
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, options = {}) => {
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    options = {
        path: '/',
        ...options,
    };

    Object.keys(options).forEach(key => {
        const optionValue = options[key];
        updatedCookie += `; ${key}`;

        if (optionValue !== true) {
            updatedCookie += `=${optionValue}`;
        }
    });

    document.cookie = updatedCookie;
};

export const deleteCookie = name => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);

    setCookie(name, '', {
        expires: date,
    });
};
