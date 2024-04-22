import BaseFetcher from "./baseFetcher";

class TukiFetcher extends BaseFetcher {
  static routerBaseUrl = "/Tukis";

  static async getTuki() {
    return (await this.httpget(this.routerBaseUrl)).data;
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
