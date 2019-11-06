<div id="home">
  <div id="calendar-form">
    <h1>Calendar</h1>

    <!-- CALENDAR COMPONENT -->
    <Calendar tasks={tasks} on:selectedDay={onSelectedDay}/>

    <!-- TASK FORM COMPONENT -->
    <TaskForm on:taskCreated={onTaskCreated} />

  </div>
  <div id="tasks">

    <!-- TASK LIST COMPONENT -->
    <TaskList tasks={tasksSelected} on:deletedTask={onTaskDeleted} />

  </div>
</div>

<script>
  import Calendar from './Calendar.svelte'
  import TaskForm from './TaskForm.svelte'
  import TaskList from './TaskList.svelte'

  import moment from 'moment'

  const today = moment().format("YYYYMMDD")

  let tasks = [
    { id: 1, day: '20180328', description: 'CanariasJS meetup!!' },
    { id: 2, day: '20180329', description: 'Vacaciones' },
    { id: 3, day: '20180401', description: 'Uno de abril' },
    { id: 4, day: '20180423', description: 'D�a del libro' }
  ]

  let nextTaskId = tasks.length + 1
  let selectedDay = today

  $: tasksSelected = tasks.filter(e => e.day === selectedDay)

  const onTaskCreated = event => {
    tasks = [
      ...tasks,
      {
        id: nextTaskId++,
        day: selectedDay,
        description: event.detail
      }
    ]
    tasks = tasks
  }

  const onTaskDeleted = (event) => {
    const taskId = event.detail
    tasks = tasks.filter(task => task.id != taskId)
  }

  const onSelectedDay = (event) => {
    selectedDay = event.detail
  }
</script>

<style>
  #home {
    display: flex;
    padding: 10px;
    height: calc(100vh - 20px);
  }

  #calendar-form {
    flex: 1;
    margin: 20px;
  }

  #tasks {
    display: block;
    flex: 1;
    margin: 20px;
  }

  :global(h1) {
    color: #de3800;
    margin: 0 0 30px 0;
  }

  :global(html) {
    background-color: #555;
  }

  :global(body) {
    margin: 0 auto;
    padding: 0;
    max-width: 1200px;
    background: white;
    box-shadow: 0px 2px 28px -8px rgba(0, 0, 0, 0.95);
  }

  :global(body),
  :global(input),
  :global(button) {
    font-family: "Roboto Mono", "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>