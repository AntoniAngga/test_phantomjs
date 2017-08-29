var page = require('webpage').create();
var url = "https://www.aliexpress.com/"
page.viewportSize = {width: 1024, height: 768};
var productID = "32544859436"


page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.open(url,function (status) {
  if(status === "success") {
    //do something
    console.log("Masuk Page");
    page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js", function () {
      page.evaluate(function (productID) {
        $("#search-key").val(productID);
        $("#form-searchbar > div.searchbar-operate-box > input").click();
      }, productID)

      page.onLoadFinished = function(status) {
        if(status === "success") {
          console.log("Sudah dapat minion nya :D");
          page.render('minion.jpeg')
          var result = null
          var categories = document.getElementsByName("ui-breadcrumb")[0].children[0].innerText
          var categories_split = categories.split(" > ")

          var product_rating = document.getElementsByName("product-customer-reviews")[0].innerText
          var product_rating_split = product_rating.split("/n")
          result = page.evaluate(function () {
            return ({
              status : 200,
              date : new Date(),
              product_id : productID,
              categories : [{
                categories_name : categories_split[1]
              },{
                categories_name : categories_split[2]
              },{
                categories_name : categories_split[3]
              }],
              product_name : document.getElementsByClassName("product-name")[0].innerText,
              product_ratting : `${product_rating[1]}${product_rating[2]}`
            })
          })
          console.log(JSON.stringify(result));
          phantom.exit()
        } else {
          console.log("id nya not found")
        }
      };
    page.render('input_id.jpeg');
    })
  } else {
    console.log("error brooo");
  }
})