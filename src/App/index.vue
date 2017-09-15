
<template>
  <div class="container" id="todo-list-container">
    <div class="banner">
      <i class="iconfont icon-left" @click="turnPre"></i>
      <div class="center" v-html="selectedDate"></div>
      <i class="iconfont icon-right" @click="turnPost"></i>
    </div>
    <ul class="list-container" v-if="todos.length > 0">
      <li class="li" v-for="(todo, index) in todos" :key="index">
        <div class="list" v-bind:class="todo.status">
          <div class="status">
            <div class="icon-container">
              <i class="icon" @click="changeStatus(todo.status, todo)">
                {{ todo.status === 'done' ? '&#10003' : '' }}
              </i>
            </div>
          </div>
          <div class="content" :title="todo.message" @click="toggleAction(todo)">
            {{ todo.message }}
          </div>
          <div class="notice">
            <i class="iconfont icon-notice" :class="{ disabled: !todo.setNotice }"></i>
          </div>
        </div>
        <transition name="custom-classes-transition"
            enter-active-class="animated swing"
            leave-active-class="animated flipOutY" >
          <div class="actions" v-if="todo.showAction">
            <div class="action" v-if="!todo.setNotice">
              <i class="iconfont icon-notice"></i>
            </div>
            <div class="action" @click="deleteTodo(index)">
              <i class="iconfont icon-delete"></i>
            </div>
          </div>
        </transition>
      </li>
    </ul>
    <ul class="list-container" v-else>
      <li class="li">
        <div class="tip">There are no todos.</div>
      </li>
    </ul>
    <transition name="custom-classes-transition"
            enter-active-class="animated flipInX"
            leave-active-class="animated flipOutX" >
      <div class="input-container" v-if="today === currentDate">
        <transition name="custom-classes-transition"
              enter-active-class="animated bounceIn"
              leave-active-class="animated bounceOut" >
          <div class="notice-select" v-if="showDateSelect">
            <div class="notice-icon">
              <i class="iconfont icon-notice" :class="{ disabled: setNotice }" @click="setNotice = !setNotice"></i>
            </div>
            <div class="date-select">
              <select v-model="noticeHour" :disabled="!setNotice">
                <option v-for="hour in 24" :value="hour - 1">{{ hour - 1 }}</option>
              </select>
              <span class="time-split">:</span>
              <select v-model="noticeMin" :disabled="!setNotice">
                <option v-for="min in 60" :value="min - 1">{{ min - 1 }}</option>
              </select>
            </div>
          </div>
        </transition>
        <div class="li">
          <div class="status">
            <div class="icon-container">
              <i class="icon"></i>
            </div>
          </div>
          <div class="content">
            <input type="text" placeholder="Type a new task, then Enter" @keyup="typeNewTask" v-model="inputVal">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  var weekObj = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  console.log(window.chrome)

  const chrome = window.chrome

  export default {
    data() {
      return {
        today: '',
        currentDate: '',
        todos: [],
        inputVal: '',
        showDateSelect: false,
        setNotice: false,
        noticeHour: 0,
        noticeMin: 0
      }
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
        if (this.currentDate.length === 0) return (new Date());
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
          if (!response.map) return;
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
          if (response) {
            newTodo.showAction = false;
            _this.todos.push(newTodo);
          }
        });
      },
      typeNewTask: function(e) {
        var inputVal = this.inputVal.trim();
        var keyCode = e.keyCode;
        this.showDateSelect = inputVal.length > 0;
        if (inputVal.length > 0 && keyCode === 13) {
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
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
