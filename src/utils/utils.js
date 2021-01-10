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

  isFromBefore2018 = (startYear) => {
    let year = startYear.slice(0, 4);
    return year < 2018;
  };

  getSales = (clientsToFilter) =>
    clientsToFilter.filter((c) => c.sold === false);

  getSalesByProperty = (key, clientsToFilter) => {
    return this.getClientProperty(key, utils.getSales(clientsToFilter));
  };

  countSalesByKey = (sales) => {
    return sales.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
  };

  getTopSalesByKey = (sales) => {
    let salesCounts = this.countSalesByKey(sales);
    console.log("salesCounts: ", salesCounts);
    let maxCount = Math.max(...Object.values(salesCounts));
    let mostFrequent = Object.keys(salesCounts).filter(
      (k) => salesCounts[k] === maxCount
    );
    console.log("mostFrequent: ", mostFrequent);
    return mostFrequent;
  };
}

let utils = new Utils();

export default utils;
