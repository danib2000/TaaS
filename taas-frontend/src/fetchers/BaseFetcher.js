import axios from "axios";

class BaseFetcher {
  static baseUrl = "http://localhost:3001";

  static async httpGet(url) {
    return await axios.get(this.baseUrl + url);
  }
  static async httpPost(url, body) {
    return await axios.post(this.baseUrl + url, body);
  }
}

export default BaseFetcher;
