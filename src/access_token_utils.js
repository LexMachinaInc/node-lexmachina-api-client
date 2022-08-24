const storage = require('node-persist');
const { ClientCredentials } = require('simple-oauth2');
const TOKEN_KEY = 'accesstoken'
const debug = require('debug')('auth')
const path = require('path');

module.exports = class AccessTokenUtils {

  constructor(input_config_file_path) {
    var config_file_path="";
    if (!input_config_file_path) {
      config_file_path =  '../config/config-auth.json'
    } else {
    if (!path.isAbsolute(input_config_file_path)) {
      config_file_path = path.join(process.cwd(), input_config_file_path)
    } else {
      config_file_path = input_config_file_path;
    }
    }

    try {
    this.token_config = require(config_file_path);
    } catch (e){
      console.log(" Cannot load access token config file at " + config_file_path);
      throw (e);
    }
    
  }

  async fetchTokenIntoStorage() {
    const client = new ClientCredentials(this.token_config);

      const accessToken = await client.getToken();
      debug('Fetched token from server: ', accessToken)
      await storage.init();
      await storage.setItem(TOKEN_KEY, accessToken)
    
  }

  async getTokenFromStorage() {
    await storage.init();
    var token = null
    try {
      var freeze_dried_token = await storage.getItem(TOKEN_KEY)
      const client = new ClientCredentials(this.token_config);
      if (freeze_dried_token) {
        token = client.createToken(freeze_dried_token);
      }
    } catch (error) { console.log(error) }
         if (token && token.expired()) {
          debug("Token is expired")
        }

    if (!token || !token.token.access_token || token.expired()) {
      await this.fetchTokenIntoStorage(this.token_config);
      token = await this.getTokenFromStorage()
    }
    debug("Have Access Token: " + token.token.access_token )
    return token
  }

  async getAccessToken() {
    var token = await this.getTokenFromStorage();
    if (token && token.token && token.token.access_token) {
      return token.token.access_token
    }
  }
};