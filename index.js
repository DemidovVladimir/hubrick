var taskCounter = 0;
var jsonObject;

function addTask() {
  taskCounter++;
  var newTask = document.createElement('div');
  newTask.setAttribute('id', 'task-'+taskCounter);
  newTask.innerHTML = (
  ["<label>Rule title:",
    "<input name=title-"+taskCounter+" type='text'/>",
    "</label>",
    "</br>",
    "<label>Rule id:",
    "<input disabled='true' name=id-"+taskCounter+" type='text' value='"+taskCounter+"'/>",
    "</label>",
    "</br>",
    "<label>Rule body:",
    "<textarea name=body-"+taskCounter+"></textarea>",
    "</label>",
    "</br>",
    "<label>If rule passed:",
    "<input name=condition-true-"+taskCounter+" type='text'/>",
    "</label>",
    "</br>",
    "<label>If rule failed:",
    "<input name=condition-false-"+taskCounter+" type='text'/>",
    "</label>",
    "</br>"].join('')
  )
  document.getElementById('container').appendChild(newTask);
}

function initialTest(event) {
  jsonObject = document.tasks['json-object'].value;
  var firstCondition = document.tasks['body-0'].value;
  var firstResolve = document.tasks['condition-true-0'].value;
  var firstReject = document.tasks['condition-false-0'].value;
  var firstConditionValue, firstConditionProp;
  if (firstCondition.indexOf('=') > -1) {
    firstCondition = firstCondition.split('=');
    firstConditionValue = firstCondition[1];
    firstConditionProp = firstCondition[0];
  } else {
    firstConditionProp = firstCondition;
  }
  try {
    jsonObject = JSON.parse(jsonObject);
    if (jsonObject[firstConditionProp] && !firstConditionValue) {
      checkRule(firstResolve);
    } else if (jsonObject[firstConditionProp] && firstConditionValue) {
      if (jsonObject[firstConditionProp] === firstConditionValue) {
        checkRule(firstResolve);
      } else {
        console.log('Object is not equal ', firstReject);
      }
    } else {
      console.log('Object does not exists... ', firstReject);
    }
  } catch (e) {
    console.log( 'Could not parse JSON string...' );
  }
  event.preventDefault();
}

function checkRule(number) {
  var conditionValue, conditionProp;
  if (!number) {
    console.log('Task is finished... Thanks for applying!');
  } else if (taskCounter < number) {
    console.log('Task that you are trying to run, does not exists.');
  } else {
    var condition = document.tasks['body-'+number].value;
    var resolve = document.tasks['condition-true-'+number].value;
    var reject = document.tasks['condition-false-'+number].value;
    if (condition.indexOf('=') > -1) {
      condition = condition.split('=');
      conditionValue = condition[1];
      conditionProp = condition[0];
    } else {
      conditionProp = condition;
    }
    jsonObject = JSON.parse(jsonObject);
    if (jsonObject[conditionProp] && !conditionValue) {
      checkRule(resolve);
    } else if (jsonObject[conditionProp] && conditionValue) {
      if (jsonObject[conditionProp] === conditionValue) {
        checkRule(resolve);
      } else {
        console.log('Object is not equal task number - ', number);
      }
    } else {
      console.log('Object does not exists task number - ', number);
    }
  }
}
