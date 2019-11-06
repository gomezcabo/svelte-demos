<div class="task-form">
  <h1>New Task</h1>

  <!-- TWO WAY DATA BINDING -->
  <input
    type="text"
    placeholder="Task description..."
    bind:value={taskDescription}
    on:keyup={onKeyUp}
  />

  <!-- EVENT BINDING -->
  <button on:click={add}>ADD</button>
</div>

<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let taskDescription = ''

  function add () {
    if (taskDescription.trim().length > 0) {
      dispatch('taskCreated', taskDescription)
      taskDescription = ''
    }
  }

  function onClick () {
    add()
  }

  function onKeyUp (event) {
    if (event.key === 'Enter') {
      add()
    }
  }
</script>

<style lang="scss" scoped>
  .task-form {
    margin-top: 30px;
  }
  input,
  button {
    box-sizing: border-box;
    padding: 4px 10px;
    height: 32px;
    border: 1px solid #777;
  }

  button {
    width: 100px;
    color: white;
    background: #de3800;
    border: 1px solid transparent;
    font-weight: bold;
    cursor: pointer;
  }

  button:focus {
    outline: 0;
  }

  input {
    width: calc(100% - 110px);
  }
</style>