initLocalStorage();

function TaskObj(id,taskTitle,taskBody) {
  this.id = id;
  this.title = taskTitle;
  this.body = taskBody;
  this.quality = 'swill';
}

function newIdea(parsedOut) {
  $('.display-section').prepend(
  `<div class="card" id="${parsedOut.id}">

    <div class="title">
      <h1 class="card-title" contenteditable="true">${parsedOut.title}</h1>
      <button class="delete-btn" type="button" name="button"><img class="btn-icon" src="images/delete.svg" alt="delete button"></img></button>
    </div>

    <p class="card-body" contenteditable="true">${parsedOut.body}</p>

    <div class="priority-vote">
      <button class="vote-btns up-vote" type="button" name="button"><img class="btn-icon" src="images/upvote.svg" alt="up vote button"></button>

      <button class="vote-btns down-vote" type="button" name="button"><img class="btn-icon" src="images/downvote.svg" alt="down vote button"></button>

      <p class="priority">Quality: <p class="priority-level">${parsedOut.quality}</p></p>
    </div>

  </div>`)
}

$('.save-button').click(function() {
  var id = $.now();
  var taskTitle = $('.task-title').val();
  var taskBody = $('.task-body').val();
  var taskObj = new TaskObj(id,taskTitle,taskBody);
  newIdea(taskObj);
  setLocalStorage(taskObj);
  clearFields();
})

function clearFields() {
  $('.task-title').val("");
  $('.task-body').val("");
}

function setLocalStorage(taskObj) {
  var stringifyObj = JSON.stringify(taskObj);
  localStorage.setItem(id, stringifyObj);
}

function initLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var fromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
    newIdea(fromStorage);
  }
}

function getLocalStorage(id) {
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
  if (newPriority.text() == 'genius') {
    newPriority.text('plausible');
  } else if (newPriority.text() == 'plausible') {
    newPriority.text('swill');
  }
  localStorageItem.quality = newPriority.text();
  setLocalStorage(localStorageItem);
});

$('.display-section').on('click', '.up-vote', function() {
  var localStorageKey = $(this).parents('.card').attr('id');
  var localStorageItem = getLocalStorage(localStorageKey);
  var newPriority = $(this).siblings('.priority-level');
  if (newPriority.text() == 'swill') {
    newPriority.text('plausible');
  } else if (newPriority.text() == 'plausible') {
    newPriority.text('genius');
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
    var text = $(element).children().text().toLowerCase();
    var unmatch = !!text.match(lookFor);
    $(element).toggle(unmatch);
  })
})
