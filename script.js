initLocalStorage();
mostRecentIdeas();

function TaskObj(id,taskTitle,taskBody) {
  this.id = id;
  this.title = taskTitle;
  this.body = taskBody;
  this.quality = 'normal';
  this.status = 'incomplete';
}

function newIdea(parsedOut) {
  $('.display-section').prepend(
  `<div class="card" id="${parsedOut.id}">

    <div class="title">
      <h1 class="card-title" contenteditable="true">${parsedOut.title}</h1>
      <button class="delete-btn" type="button" name="button"><img class="btn-icon" src="images/delete.svg" alt="delete button"></img></button>
      <p class="card-body" contenteditable="true">${parsedOut.body}</p>
    </div>

    <div class="priority-vote">
      <button class="vote-btns up-vote" type="button" name="button"><img class="btn-icon" src="images/upvote.svg" alt="up vote button"></button>

      <button class="vote-btns down-vote" type="button" name="button"><img class="btn-icon" src="images/downvote.svg" alt="down vote button"></button>

      <p class="priority">Quality: &nbsp<p class="priority-level">${parsedOut.quality}</p></p>
    </div>

    <button class="completed-task">Task Completed</button>

   </div>`)
}

$('.save-button').click(function() {
  var id = $.now();
  var taskTitle = $('.task-title').val();
  var taskBody = $('.task-body').val();
  var taskObj = new TaskObj(id,taskTitle,taskBody);
  setLocalStorage(taskObj);
  mostRecentIdeas();
  newIdea(taskObj);
  clearFields();
  disableSaveButton();
})

function clearFields() {
  $('.task-title').val('');
  $('.task-body').val('');
}

function setLocalStorage(taskObj) {
  var id = taskObj.id;
  var stringifyObj = JSON.stringify(taskObj);
  localStorage.setItem(id, stringifyObj);
}

function initLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
    newIdea(fromStorage);
    checkStatusStyling(fromStorage);
  }
}

function getLocalStorage(id) {
  localStorageKey = id;
  return JSON.parse(localStorage.getItem(localStorageKey));
}

$('.display-section').on('click', '.delete-btn', function() {
  $(this).parents().remove('.card');
  var localStorageKey = $(this).parents('.card').attr('id')
  localStorage.removeItem(localStorageKey);
})

$('.display-section').on('click', '.down-vote', function() {
  var localStorageKey = $(this).parents('.card').attr('id');
  var localStorageItem = getLocalStorage(localStorageKey);
  var newPriority = $(this).siblings('.priority-level');
  if (newPriority.text() == 'critical') {
    newPriority.text('high');
  } else if (newPriority.text() == 'high') {
    newPriority.text('normal');
  }
  else if (newPriority.text() == 'normal') {
    newPriority.text('low');
  }
  else if (newPriority.text() == 'low') {
    newPriority.text('none');
  }
  localStorageItem.quality = newPriority.text();
  setLocalStorage(localStorageItem);
});

$('.display-section').on('click', '.up-vote', function() {
  var localStorageKey = $(this).parents('.card').attr('id');
  var localStorageItem = getLocalStorage(localStorageKey);
  var newPriority = $(this).siblings('.priority-level');
  if (newPriority.text() == 'normal') {
    newPriority.text('high');
  } else if (newPriority.text() == 'high') {
    newPriority.text('critical');
  }
  else if (newPriority.text() == 'none') {
    newPriority.text('low');
  }
  else if (newPriority.text() == 'low') {
    newPriority.text('normal');
  }
  localStorageItem.quality = newPriority.text();
  setLocalStorage(localStorageItem);
});

$('.display-section').on('blur', '.card-title', function() {
  var localStorageKey = $(this).parents('.card').attr('id');
  var localStorageItem = JSON.parse(localStorage.getItem(localStorageKey));
  localStorageItem.title = $('.card-title').text();
  localStorage.setItem(localStorageKey,JSON.stringify(localStorageItem));
});

$('.display-section').on('blur', '.card-body', function() {
  var localStorageKey = $(this).parents('.card').attr('id');
  var localStorageItem = JSON.parse(localStorage.getItem(localStorageKey));
  localStorageItem.body = $('.card-body').text();
  localStorage.setItem(localStorageKey,JSON.stringify(localStorageItem));
});

$('.search-field').on('keyup', function(){
  var lookFor = $(this).val().toLowerCase();
  $('.card').each(function(index, element){
    var text = $(element).children('.title').text().toLowerCase();
    var unmatch = !!text.match(lookFor);
    $(element).toggle(unmatch);
  })
})

function disableSaveButton() {
  if ($('.task-title').val() === "" || $('.task-body').val() === "") {
    $('.save-button').prop('disabled', true);
  } else {
    $('.save-button').prop('disabled', false);
  }
}

$('.task-title, .task-body' ).on('keyup', function () {
  disableSaveButton();
});


$('.display-section').on('click', '.completed-task', function() {
  var localStorageKey = $(this).parents('.card').attr('id');
  var localStorageItem = JSON.parse(localStorage.getItem(localStorageKey));
  var status = localStorageItem.status;
  if(status === 'incomplete') {
    localStorageItem.status = 'complete';
  }
  else {
    localStorageItem.status = 'incomplete';
  }
  setLocalStorage(localStorageItem);
  checkStatusStyling(localStorageItem);
});

function checkStatusStyling(fromStorage) {
  var idValue = "#" + fromStorage.id;
  if (fromStorage.status === 'complete') {
    $(idValue).css('background-color', '#e5e5e5');
  } else {
    $(idValue).css('background-color', 'white');
  }
}

$('.show-completed-tasks').on('click', function() {
  var storageArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
    storageArray.push(fromStorage);
    if (storageArray[i].status === 'incomplete') {
      var idValue = "#" + storageArray[i].id;
      $(idValue).hide();
    }
  }
});


function mostRecentIdeas() {
  var storageArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
    storageArray.push(fromStorage);
  }
  for (var j = storageArray.length; j >= 0; j--) {
    if(j < storageArray.length - 10) {
      var idValue = "#" + storageArray[j].id;
      $(idValue).hide();
    }
  }
}


$('.show-more-tasks').on('click', function() {
  var storageArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));

    storageArray.push(fromStorage);
    var idValue = "#" + storageArray[i].id;
    $(idValue).show();
  }
});

$('.none, .low, .normal, .high, .critical').on('click', function () {
  var priorityButton = $(this).text().toLowerCase();
  console.log(priorityButton);
  checkPriority(priorityButton);
});

function checkPriority(priorityButton) {
  console.log(priorityButton);
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var idValue = '#'+fromStorage.id;
    var priority = fromStorage.quality;
    console.log(idValue);
    console.log(priority);
      if (priorityButton !== priority) {
        $(idValue).hide();
      }
  }
}
