

// var notification = chrome.notifications.create("abc", { 
// 	type: "basic", 
// 	iconUrl: 'images/icon19.png', 
// 	title: 'Notification Demo', 
// 	message: 'Merry Christmas',
// 	buttons: [{
// 		title: 'I got this',
// 		iconUrl: 'images/icon19.png'
// 	}, {
// 		title: 'Dismiss',
// 		iconUrl: 'images/icon38.png'
// 	}]
// }, function() {}); 

// setTimeout(function() {
// 	chrome.notifications.clear("abc", function() {}); 
// }, 5000); 


(function(window, document) {
	
	var todoList = [{
		status: 'on',	//on, done, undone
		message: 'Call honey',
		setNotice: true,	//false, true
		noticeTime: '2017-03-05 10:20'
	}, {
		status: 'done',
		message: 'Write something',
		setNotice: false
	}, {
		status: 'undone',
		message: 'Study python',
		setNotice: true,
		noticeTime: '2017-02-01 10:20',
	}];

	var $listContainer = document.getElementById('todo-list');

	createLists(todoList);
	// createLists();

	function createLists(lists) {
			var $todoListHtml = '';
		if (lists && lists.length > 0) {
			lists.forEach(function(v, i) {
				$todoListHtml += createList(v);
			});
		} else {
			//no todos
			$todoListHtml += createTip();
		}
		$listContainer.innerHTML = $todoListHtml;
	}

	function createList(list) {
		var listHtml = '';
		if (typeof list === 'object') {
			listHtml = listHtml + 
				'<li class=\"li\">' + 
					'<div class=\"list ' + list.status + '\">' +
						'<div class=\"status\">' +
							'<div class=\"icon-container\">' +
								'<i class=\"icon\">' +
									(list.status === 'done' ? '✓' : '') +
								'</i>' +
							'</div>' + 
						'</div>' +
						'<div class=\"content\" title=\"' + list.message + '\">' +
							list.message +
						'</div>' +
						'<div class=\"notice\">' +
							'<i class=\"iconfont ' + (list.setNotice ? '' : 'disabled') + ' icon-notice\"></i>' +
						'</div>' +
					'</div>' +
					'<div class=\"actions\">' +
						'<div class=\"action\">' +
							'<i class=\"iconfont icon-notice\"></i>' +
						'</div>' +
						'<div class=\"action\">' +
							'<i class=\"iconfont icon-delete\"></i>' +
						'</div>' +
					'</div>' +
				'</li>';
		}
		return listHtml;
	}

	function createTip(message) {
		if (!message) message = 'There are no todos.';
		return '<li class=\"li\">' +
					'<div class=\"tip\">' + message + '</div>' +
				'</li>';
	}

}(window, document));
