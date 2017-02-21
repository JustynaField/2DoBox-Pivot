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

    driver.sleep(3000).then(function() {

      // testing title
      driver.findElement(By.className('card-title')).getText().then(function(title) {
        if(title === 'task1') {
          console.log('Test passed:Title-save');
        } else {
          console.log('Test failed, Title does not match the input.');
        }
      })

      // testing body
      driver.findElement(By.className('card-body')).getText().then(function(body) {
        if(body === 'description1') {
          console.log('Test passed: Body-save');
        } else {
          console.log('Test failed, Body does not match input.');
        }
      });
    });


  driver.quit();
}

//testing the upvote functionality
// upVote(driver_fx);
// upVote(driver_chr);
// upVote(driver_saf);
//
// function upVote (driver) {
//   driver.get('https://justynafield.github.io/2DoBox-Pivot/');
//   driver.findElement(By.className('priority-level')).getText().then(function(priority) {
//     if (priority === 'swill') {
//       driver.findElement(By.className('up-vote')).click();
//
//       driver.sleep(3000).then(function() {
//       driver.findElement(By.className('priority-level')).getText().then(function(priority) {
//         if(priority === 'plausible') {
//           console.log('Test passed:swill-upvote');
//         }
//         else {
//           console.log('Test failed, swill upvote not changed to plausible');
//         }
//
//       });
//     });
//     }
//   });
//
//     driver.quit();
// }
