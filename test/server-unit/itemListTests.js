"use strict";

require("should");
var ItemList = require("../../server/itemList");  

describe("ItemList tests", function () {

  it("verify new list is empty", function () {
    var itemList = new ItemList();

    itemList.items.length.should.equal(0);
  });  

  it("add new item to the list", function () {
    var itemList = new ItemList();
    itemList.add({ name: "New Item" });

    itemList.items.length.should.equal(1);
  });  
});