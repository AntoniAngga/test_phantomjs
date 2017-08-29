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
          result = page.evaluate(function () {
            return ({
              product_name : document.getElementsByClassName("product-name")[0].innerText
              
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

// console.log('Step 2. Input Search Bar with Product ID')
// page.evaluate(function(productID) {
//   console.log('masuk evaluate dengan productID: ' + productID)
//   document.getElementById('search-key').value = productID;
//   document.querySelector('.header .searchbar-form .search-button').click();
// })