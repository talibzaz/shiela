const prodURI = 'https://drogo.eventackle.com/api/v1/query';

const localhost = 'http://localhost:8085/api/v1/query';

const getUriByEnv = () => {
    if (process.env.NODE_ENV == "development") {
        return localhost;
    }
    return prodURI;
};

const pageViewURI = () => {
    if (process.env.NODE_ENV == "development") {
        return 'http://localhost:8085/api/v1/page-views';
    }
    return 'https://drogo.eventackle.com/api/v1/page-views';
};

const loginURI = () => {
    if (process.env.NODE_ENV == "development") {
        return 'http://localhost:8085/api/v1/login';
    }
    return 'https://drogo.eventackle.com/api/v1/login';
};

export {getUriByEnv, loginURI, pageViewURI}