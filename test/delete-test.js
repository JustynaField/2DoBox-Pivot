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



//testing the save operation
saveTask(driver_fx);
saveTask(driver_chr);
saveTask(driver_saf);

function saveTask (driver) {
  driver.get('https://justynafield.github.io/2DoBox-Pivot/');

    driver.findElement(By.className('task-title')).sendKeys('task1');
    driver.findElement(By.className('task-body')).sendKeys('description1');
    driver.findElement(By.className('save-button')).click();

    driver.findElement(By.className('task-title')).sendKeys('task2');
    driver.findElement(By.className('task-body')).sendKeys('description2');
    driver.findElement(By.className('save-button')).click();

    driver.findElement(By.className('delete-btn')).click();

    driver.sleep(3000).then(function() {

      driver.findElement(By.className('card-title')).getText().then(function(title) {
        if(title === 'task1') {
          console.log('Test passed: Card deleted');
        } else {
          console.log('Test failed, Card not deleted.');
        }
      })


    });


  driver.quit();
}
