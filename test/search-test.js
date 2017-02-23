var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();



//testing the save operation
search(driver_fx);
search(driver_chr);


function search(driver) {
  driver.get('https://justynafield.github.io/2DoBox-Pivot/');

    driver.findElement(By.className('search-field')).sendKeys('mysearch');
    driver.findElement(By.className('title-box')).click();

    driver.sleep(3000).then(function() {

      // testing search field for input
      driver.findElement(By.className('search-field')).getText().then(function(title) {
        if(title === 'mysearch') {
          console.log('Test passed: input entered in search field');
        } else {
          console.log('Test failed, no input in search field');
        }
      });
    });


  driver.quit();
}
