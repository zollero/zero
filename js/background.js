// var notification = chrome.notifications.create("abc", { 
// 	type: "basic", 
// 	iconUrl: 'images/icon19.png', 
// 	title: 'Notification Demo', 
// 	message: 'Merry Christmas' 
// }, function() {}); 

// setTimeout(function() { 
// 	chrome.notifications.clear("abc", function() {}); 
// }, 5000); 

// alert('1111')


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	// sendResponse(sender);
	// var todo = message[0];
	// var messageSender = message[1];
	// sendResponse(message)
	var type = message.type;
	if(type === 'add') {
		var todos = JSON.parse(localStorage.getItem(message.date));
		if (!todos) todos = [];
		todos.push(message.newTodo);
		localStorage.setItem(message.date, JSON.stringify(todos));
		sendResponse(true);
	} else if (type === 'getAll') {
		var todos = JSON.parse(localStorage.getItem(message.date));
		if (todos == null) {
			todos = [];
		}
		sendResponse(todos);
	}
	// sendResponse(true);
});

