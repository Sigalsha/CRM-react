class Utils {
  getClientProperty = (property, clients) => {
    return clients.map((c) => c[property]);
  };

  reduceDuplications = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  };

  findClientIndex = (clients, client) => {
    for (let i in clients) {
      if (clients[i].client === client) {
        return i;
      }
    }
  };

  findClientIndexById = (clients, id) => {
    for (let i in clients) {
      if (clients[i]._id === id) {
        return i;
      }
    }
    return false;
  };
}

let utils = new Utils();

export default utils;
