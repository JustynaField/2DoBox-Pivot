var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_saf = new webdriver.Builder()
    .forBrowser('safari')
    .build();

saveTask(driver_fx);
saveTask(driver_chr);
saveTask(driver_saf);


//testing the save operation
function saveTask (driver) {
  driver.get('https://justynafield.github.io/2DoBox-Pivot/');

    driver.findElement(By.className('task-title')).sendKeys('task1');
    driver.findElement(By.className('task-body')).sendKeys('description1');
    driver.findElement(By.className('save-button')).click();

    driver.sleep(3000).then(function() {

      // testing title
      driver.findElement(By.className('card-title')).getText().then(function(title) {
        if(title === 'task1') {
          console.log('Test passed');
        } else {
          console.log('Test failed, Title does not match the input.');
        }
      })

      // testing body
      driver.findElement(By.className('card-body')).getText().then(function(body) {
        if(body === 'description1') {
          console.log('Test passed');
        } else {
          console.log('Test failed, Body does not match input.');
        }
      });
    });

  // driver.findElement(By.name('q')).sendKeys('webdriver');
  // driver.findElement(By.name('btnG')).click();
  //
  // driver.sleep(3000).then(function() {
  //   driver.getTitle().then(function(title) {
  //     if(title === 'webdriver - Google Search') {
  //       console.log('Test passed');
  //     } else {
  //       console.log('Test failed');
  //     }
  //   });
  // });

  driver.quit();
}
