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


// testing the upvote functionality
upVote(driver_fx);
upVote(driver_chr);
upVote(driver_saf);

function upVote(driver) {
 driver.get('https://justynafield.github.io/2DoBox-Pivot/');
 // driver.findElement(By.className('priority-level')).getText().then(function(priority) {
 //   if (priority === 'swill') {

 driver.findElement(By.className('task-title')).sendKeys('task1');
 driver.findElement(By.className('task-body')).sendKeys('description1');
   driver.findElement(By.className('save-button')).click();
     driver.findElement(By.className('up-vote')).click();
   // }

     driver.sleep(5000).then(function() {

     driver.findElement(By.className('priority-level')).getText().then(function(priority) {
       if(priority === 'plausible') {
         console.log('Test passed:swill-upvote');
       }
       else {
         console.log('Test failed, swill upvote not changed to plausible');
       }

     });
   });



   driver.quit();
}
