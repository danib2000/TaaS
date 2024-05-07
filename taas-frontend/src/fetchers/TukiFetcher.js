import BaseFetcher from "./BaseFetcher";

class TukiFetcher extends BaseFetcher {
  static routerBaseUrl = "/tukis";

  static async getTukis() {
    return (await this.httpGet(this.routerBaseUrl)).data;
  }

  static async getTukisByName(name) {
    return await this.httpGet(this.routerBaseUrl + "/name/" + name);
  }

  static async getTukisByType(type) {
    return await this.httpGet(this.routerBaseUrl + "/type/" + type);
  }

  static async postTuki(name, type, imageSrc) {
    return this.httpPost(this.routerBaseUrl, {
      name: name,
      type: type,
      imgageSrc: imageSrc,
    });
  }
}
export default TukiFetcher;
