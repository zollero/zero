
<template>
  <ul class="list-container">
    <li class="li" v-if="data.length === 0">
      <div class="tip">There are no todos.</div>
    </li>
    <li class="li" v-for="(todo, index) in data" :key="index">
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
        <!-- <div class="notice">
          <i class="iconfont icon-notice" :class="{ disabled: !todo.setNotice }"></i>
        </div> -->
      </div>
      <transition name="custom-classes-transition"
        enter-active-class="animated swing"
        leave-active-class="animated flipOutY" >
        <div class="actions" v-if="todo.showAction">
          <!-- <div class="action" v-if="!todo.setNotice">
            <i class="iconfont icon-notice"></i>
          </div> -->
          <div class="action" @click="deleteTodo(index)">
            <i class="iconfont icon-delete"></i>
          </div>
        </div>
      </transition>
    </li>
  </ul>
</template>

<script>
  const chrome = window.chrome

  export default {
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      currentDate: {
        type: String,
        required: true,
        default: () => {
          const date = new Date();
          return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
        }
      }
    },
    methods: {
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
          todos: _this.data
        });
      },
      toggleAction: function(todo) {
        todo.showAction = !todo.showAction;
      },
      deleteTodo: function(index) {
        var _this = this;
        console.log(index);
        _this.data.splice(index, 1);
        chrome.runtime.sendMessage({
          type: 'save',
          date: _this.currentDate,
          todos: _this.data
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
