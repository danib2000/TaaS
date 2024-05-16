import axios from "axios";

class BaseFetcher {
  static baseUrl = "";

  static async httpGet(url) {
    return await axios.get(this.baseUrl + url);
  }
  static async httpPost(url, body) {
    return await axios.post(this.baseUrl + url, body);
  }

  static async httpDelete(url) {
    return await axios.delete(this.baseUrl + url);
  }
}

export default BaseFetcher;
