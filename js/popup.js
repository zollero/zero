/*!
 * z-todo  - https://github.com/zollero/todo-chrome
 * Version - 1.0.0
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2017 zollero
 */


(function(window, document) {
	
	// var todoList = [{
	// 	status: 'on',	//on, done, undone
	// 	message: 'Call honey',
	// 	setNotice: true,	//false, true
	// 	noticeTime: '2017-03-05 10:20'
	// }, {
	// 	status: 'done',
	// 	message: 'Write something',
	// 	setNotice: false
	// }, {
	// 	status: 'undone',
	// 	message: 'Study python',
	// 	setNotice: true,
	// 	noticeTime: '2017-02-01 10:20',
	// }];

	var $listContainer = document.getElementById('todo-list');
	var $addTaskInput = document.getElementById('add-task');


	$addTaskInput.addEventListener('keyup', function(e) {
		var value = e.target.value;
		if(e.keyCode === 13 && value.trim().length > 0) {
			console.log('Type enter');
			var newTodo = {
				status: 'on',
				message: value,
				setNotice: false,
				noticeTime: ''
			};
			e.target.value = '';
			saveNewTodo(newTodo);
			refreshList();
		}
	}, false);

	function saveNewTodo(newTodo) {
		var todos = JSON.parse(localStorage.getItem('todos'));
		if (!todos) todos = [];
		todos.push(newTodo);
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	function refreshList() {
		createLists(JSON.parse(localStorage.getItem('todos')));
	}

	refreshList();

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
									(list.status === 'done' ? '&#10003' : '') +
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
