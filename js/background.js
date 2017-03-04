var notification = chrome.notifications.create("abc", { 
	type: "basic", 
	iconUrl: 'images/icon19.png', 
	title: 'Notification Demo', 
	message: 'Merry Christmas' 
}, function() {}); 

setTimeout(function() { 
	chrome.notifications.clear("abc", function() {}); 
}, 5000); 

// alert('1111')