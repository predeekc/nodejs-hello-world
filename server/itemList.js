"use strict";

function ItemList() {
  this.items = [];
}

ItemList.prototype.add = function (item) {
  this.items.push(item);
  
};

module.exports = ItemList;