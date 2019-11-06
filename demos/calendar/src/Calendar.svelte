<div class="calendar">

  <!-- PREV/NEXT actions & HEADER -->
  <div class="actions">
    <button on:click={prevMonth}> ⇠ </button>
    <div class="month">{ monthName} { year }</div>
    <button on:click={nextMonth}> ⇢ </button>
  </div>

  <!-- DAY NAMES HEADER -->
  {#each weekDays as day}
    <div class="day header">
      { day }
    </div>
  {/each}

  <!-- EXTRA DAYS BEFORE -->
  {#if extraDaysBefore > 0}
    {#each Array(extraDaysBefore) as _ }
      <div class="day empty">
        <!-- empty -->
      </div>
    {/each}
  {/if}

  <!-- MONTH DAYS -->
  {#each daysInMonth as day}
    <div
      class="day"
      class:selected={isSelectedDay(day)}
      class:has-tasks={dayHasTasks(day)}
      on:click={() => selectDay(day)}
    >
     { day }
    </div>
  {/each}
</div>

<script>
  export let tasks

  import moment from 'moment'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const today = moment()
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

  let month = today.month()
  let year = today.year()
  let selectedDay = today

  // CURRENT MONTH
  $: currentMonth = moment().year(year).month(month)

  // NUMBER OF DAYS IN MONTH
  $: daysInMonth = tasks && selectedDay && Array(currentMonth.daysInMonth())
    .fill(0)
    .map((_, index) => index + 1)

  // EXTRA DAYS
  $: extraDaysBefore = currentMonth.startOf('month').day() - 1

  $: monthName = monthNames[month]

  const prevMonth = () => {
    if (month === 0) {
      month = 11
      year--
    } else {
      month--
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      month = 0
      year++
    } else {
      month++
    }
  }

  const isSelectedDay = (day) => {
    const currentDay = moment()
      .year(year)
      .month(month)
      .date(day)
      .format("YYYYMMDD")
    return currentDay === selectedDay.format("YYYYMMDD")
  }

  const dayHasTasks = (day) => {
    const currentDay = moment()
      .year(year)
      .month(month)
      .date(day)
      .format("YYYYMMDD")

    return tasks.filter(e => e.day === currentDay).length > 0
  }

  const selectDay = (day) => {
    selectedDay = moment()
      .year(year)
      .month(month)
      .date(day)

    dispatch('selectedDay', selectedDay.format('YYYYMMDD'))
  }
</script>

<style lang="scss" scoped>
  .calendar {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border: 1px solid #eee;
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.15);
    padding-bottom: 10px;
  }

  .calendar .actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .calendar .actions .month {
    color: #de3800;
    font-size: 22px;
  }

  .calendar .actions button {
    appearance: none;
    border: 0;
    background: transparent;
    margin: 10px 20px;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  .calendar .day {
    width: calc(100% * (1 / 7) - 24px);
    padding: 10px 6px;
    border-radius: 3px;
    margin: 6px 6px;
    position: relative;
    display: inline-block;
    text-align: center;
    color: darkslategray;
  }

  .calendar .day.empty {
    background: white;
  }

  .calendar .day.header {
    background: transparent;
    font-weight: bold;
  }

  .calendar .day.has-tasks {
    font-weight: bold;
    color: #de3800;
    background-color: rgba(222, 56, 0, 0.1);
    text-decoration: underline;
  }

  .calendar .day.selected {
    background-color: rgba(48, 99, 207, 0.9);
    cursor: default;
    color: white;
  }

  .calendar .day:not(.empty):not(.header):not(.selected):hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
</style>