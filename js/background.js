/*!
 * z-todo  - https://github.com/zollero/todo-chrome
 * Version - 1.0.0
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2017 zollero
 */

//TODO 默认查询今日需要添加的提醒

// check chrome.notification permission



/**
 * Manage popup.html data routers
 */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	var type = message.type;
	if(type === 'add') {
		var todos = JSON.parse(localStorage.getItem(message.date));
		if (!todos) todos = [];
		todos.push(message.newTodo);
		checkToAddNotice(message.newTodo);
		localStorage.setItem(message.date, JSON.stringify(todos));
		sendResponse(true);
	} else if (type === 'getAll') {
		var todos = JSON.parse(localStorage.getItem(message.date));
		if (todos == null) {
			todos = [];
		}
		sendResponse(todos);
	} else if (type === 'save') {
		localStorage.setItem(message.date, JSON.stringify(message.todos));
	}
});


/**
 * Check whether to add notice event listener on this todo.
 */
function checkToAddNotice(todo) {
	if(todo && todo.setNotice) {
		var time = todo.noticeTime.split(':');
		var hour = time[0],
			min = time[1];
		var date = new Date();
		date.setHours(Number(hour));
		date.setMinutes(Number(min));
		date.setSeconds(0);
		var timeMin = date.getTime() - Date.now();
		if (timeMin > 0) {
			addNoticeEvent(timeMin, todo);
		}
	}
}

/**
 * Add notice event on the todo
 */
function addNoticeEvent(milliseconds, todo) {
	setTimeout(function() {
		//TODO 判断当前todo是否已经完成，若未完成，则提醒，否则不提醒
		var notification = chrome.notifications.create("abc", {
			type: "basic",
			iconUrl: 'images/icon38.png',
			priority: 2,
			eventTime: 10000,
			title: 'Notice',
			message: todo.message
		});
		// setTimeout(function() {
		// 	chrome.notifications.clear("abc", function() {});
		// }, 5000);
	}, milliseconds);
}

function checkNotification() {
	if (!(Notification in window)) {
		alert('The browser does not support desktop notification.')
	} else if (Notification.permission === 'granted') {
		new Notification('Granted');
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function(permission) {
			if (permission === 'granted') {
				new Notification('Request granted!')
			}
		})
	}
}
