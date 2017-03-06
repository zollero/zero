

/*!
 * z-todo  - https://github.com/zollero/todo-chrome
 * Version - 1.0.0
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2017 zollero
 */


(function(window, document) {
	
	'use strict';

	var todoApp = new Vue({
		el: '#todo-list-container',
		data: {
			today: '',
			currentDate: '',
			todos: [],
			inputVal: ''
		},
		computed: {
			selectedDate: function() {
				var date = this.getCurrentDate();
				var day = date.getDay();

				switch(day) {
					case 0:
						day = 'Sun';
						break;
					case 1:
						day = 'Mon.';
						break;
					case 2:
						day = 'Tue.';
						break;
					case 3:
						day = 'Wed.';
						break;
					case 4:
						day = 'Thu.';
						break;
					case 5:
						day = 'Fri.';
						break;
					case 6:
						day = 'Sat.';
						break;
					default:
						break;
				}
				return '<b>' + day + '</b>' + ' ' + this.currentDate;
			}
		},
		methods: {
			getCurrentDate: function() {
				if(this.currentDate.length === 0) return (new Date());
				var dateInfo = this.currentDate.split('.');
				var date = new Date(Number(dateInfo[0]), Number(dateInfo[1]) - 1, Number(dateInfo[2]));
				return date;
			},
			formatDate: function(date) {
				return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
			},
			toggleAction: function(todo) {
				todo.showAction = !todo.showAction;
			},
			initDate: function() {
				var today = this.formatDate(new Date());			
				this.today = today;
				this.currentDate = today;
			},
			getTodods: function() {
				var todos = JSON.parse(localStorage.getItem(this.currentDate));
				if (todos !== null && todos.length) {
					todos.map(function(v, i) {
						v.showAction = false;
						return v;
					});
				} else {
					todos = [];
				}
				this.todos = todos;
			},
			init: function() {
				this.initDate();
				this.getTodods();
			},
			saveNewTodo: function(newTodo) {
				var todos = JSON.parse(localStorage.getItem(this.currentDate));
				if (!todos) todos = [];
				todos.push(newTodo);
				localStorage.setItem(this.currentDate, JSON.stringify(todos));
			},
			typeNewTask: function(e) {
				var inputVal = this.inputVal.trim();
				if(inputVal.length > 0) {
					var newTodo = {
						status: 'on',
						message: inputVal,
						setNotice: false,
						noticeTime: ''
					};
					this.inputVal = '';
					this.saveNewTodo(newTodo);
					this.getTodods();
				}
			},
			changeStatus: function(currentStatus, currentTodo) {
				if (currentStatus === 'on') {
					currentTodo.status = 'done';
				} else if (currentStatus === 'done') {
					currentTodo.status = 'on';
				} else if (currentStatus === 'undone') {
					currentTodo.status = 'on';
				}
				localStorage.setItem(this.currentDate, JSON.stringify(this.todos));
			},
			deleteTodo: function(index) {
				this.todos.pop(index);
				localStorage.setItem(this.currentDate, JSON.stringify(this.todos));
			},
			turnPre: function() {
				var date = this.getCurrentDate();
				var preDate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
				var currentDate = this.formatDate(preDate);
				this.currentDate = currentDate;
				this.getTodods();
			},
			turnPost: function() {
				var date = this.getCurrentDate();
				var preDate = new Date(date.getTime() + 1000 * 60 * 60 * 24);
				var currentDate = this.formatDate(preDate);
				this.currentDate = currentDate;
				this.getTodods();
			} 
		}
	});

	todoApp.init();

}(window, document));
