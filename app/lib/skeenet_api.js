const SKEENET_API = "https://skeenet-api.herokuapp.com"

export default class SkeenetApi {

  get(path) {
    return fetch(SKEENET_API + path)
  };

  post(path, options) {
    return fetch(SKEENET_API + path, {
      method: 'post',
      body: JSON.stringify(options)
    })
  };
  //
  // put(path, options) {
  //   return fetch(SKEENET_API + path, options)
  // }
  //
  // del(path, options) {
  //   return fetch(SKEENET_API + path, options)
  // }
}
