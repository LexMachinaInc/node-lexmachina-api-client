const axios =  require('axios');
const package_json = require('../package.json')
const AccessTokenUtils =  require('./access_token_utils.js');
const BASE_URL = 'https://api.lexmachina.com/beta';

module.exports = class BaseLexMachinaRequest {

    constructor(token_config_file_path) {
        this.token_config_file_path = token_config_file_path;
        try {
            this.atu = new AccessTokenUtils(token_config_file_path);
        } catch (e) {
            console.log(e +' : Cannot load authentication config file');
            process.exit(1);
        }

    }

    async requestURL(config) {
        const rax = await import('retry-axios');
        rax.attach();

        var returnValue = null;
        var urlParams = null;
        if (!config.endpoint) {
            throw new Error('endpoint must be defined');
        }

        var url = config.endpoint;
        var token = await this.atu.getAccessToken();
        if (config.params) {
            urlParams = new URLSearchParams();
            Object.keys(config.params).forEach(key => {
                if (Array.isArray(config.params[key])) {
                    config.params[key].forEach(value => {
                        urlParams.append(key, value);
                    });
                } else {
                    urlParams.append(key, config.params[key]);
                }
            });
        }

        var options = {
            baseURL: BASE_URL,
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Lex-Machina-JavaScript-Client/' + package_json.version
            },
            params: urlParams,
            raxConfig: {
                retry: 3,
                httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
                statusCodesToRetry: [[100, 199], [401, 401], [500, 599]],
            }};

        if (config.method) {
            options.method = config.method;
        }
        if (config.data) {
            options.data = config.data;
        }
        if (config.base_url) {
            options.baseURL = config.base_url;
        }
    
        try {
            var response = await axios(url, options);
            returnValue = response.data;
        } catch (error) {
            console.log(error);
        }
        return returnValue;
    }
};