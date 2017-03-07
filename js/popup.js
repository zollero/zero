

/*!
 * z-todo  - https://github.com/zollero/todo-chrome
 * Version - 1.0.0
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2017 zollero
 */


(function(window, document) {
	
	'use strict';

	var weekObj = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

	var todoApp = new Vue({
		el: '#todo-list-container',
		data: {
			today: '',
			currentDate: '',
			todos: [],
			inputVal: '',
			showDateSelect: false,
			setNotice: false,
			noticeHour: 0,
			noticeMin: 0
		},
		computed: {
			selectedDate: function() {
				var date = this.getCurrentDate();
				var day = date.getDay();
				day = weekObj[day];
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
				var _this = this;
				chrome.runtime.sendMessage({ 
					type: 'getAll', 
					date: _this.currentDate
				}, function(response) {
					if(!response.map) return;
					response.map(function(v, i) {
						v.showAction = false;
						return v;
					});
					_this.todos = response;
				});
			},
			init: function() {
				this.initDate();
				this.getTodods();
			},
			saveNewTodo: function(newTodo) {
				console.log(newTodo);
				var _this = this;
				chrome.runtime.sendMessage({
					type: 'add',
					date: _this.currentDate,
					newTodo: newTodo
				}, function(response) {
					console.log(response);
					if(response) {
						newTodo.showAction = false;
						_this.todos.push(newTodo);
					}
				});
			},
			typeNewTask: function(e) {
				var inputVal = this.inputVal.trim();
				var keyCode = e.keyCode;
				this.showDateSelect = inputVal.length > 0;
				if(inputVal.length > 0 && keyCode === 13) {
					this.showDateSelect = true;
					var newTodo = {
						status: 'on',
						message: inputVal,
						setNotice: this.setNotice,
						noticeTime: this.setNotice ? this.noticeHour + ':' + this.noticeMin : ''
					};
					this.saveNewTodo(newTodo);
					this.inputVal = '';
					this.setNotice = false;
					this.showDateSelect = false;
					this.noticeHour = 0;
					this.noticeMin = 0;
					// this.getTodods();
				}
			},
			changeStatus: function(currentStatus, currentTodo) {
				var _this = this;
				if (currentStatus === 'on') {
					currentTodo.status = 'done';
				} else if (currentStatus === 'done') {
					currentTodo.status = 'on';
				} else if (currentStatus === 'undone') {
					currentTodo.status = 'on';
				}
				chrome.runtime.sendMessage({
					type: 'save',
					date: _this.currentDate,
					todos: _this.todos
				});
			},
			deleteTodo: function(index) {
				var _this = this;
				console.log(index);
				_this.todos.splice(index, 1);
				chrome.runtime.sendMessage({
					type: 'save',
					date: _this.currentDate,
					todos: _this.todos
				});
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
