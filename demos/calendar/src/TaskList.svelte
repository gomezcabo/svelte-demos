<div id="task-list">
  <h1>Tasks</h1>

  {#each tasks as task}
    <div class="task">
      <div class="description">
        {task.description}
      </div>
      <div class="delete" on:click={() => onClick(task.id)}>Remove</div>
    </div>
  {:else}
    <div class="empty">
      No tasks for selected day
    </div>
  {/each}
</div>

<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let tasks = []

  function onClick (taskId) {
    dispatch('deletedTask', taskId)
  }
</script>

<style lang="scss" scoped>
  #task-list .task {
    padding: 15px 20px;
    border: 1px solid #ddd;
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
  }

  #task-list .delete {
    cursor: pointer;
    color: darkred;
    font-weight: bold;
  }

  .empty {
    padding-top: 20px;
  }
</style>