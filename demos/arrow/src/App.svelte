<script>
  import { onMount } from 'svelte'
  import Arrow from './Arrow.svelte'

  let x0 = 0
  let y0 = 0
  let x1 = 10
  let y1 = 10

  const arrowCombinations = [
    { start: 'V', end: 'V' },
    { start: 'V', end: 'H' },
    { start: 'H', end: 'H' },
    { start: 'H', end: 'V' }
  ]

  let arrowCombinationIndex = 0

  $: start = arrowCombinations[arrowCombinationIndex].start
  $: end = arrowCombinations[arrowCombinationIndex].end

  const onMouseMove = event => {
    x1 = event.clientX
    y1 = event.clientY
  }

  const onClick = event => {
    arrowCombinationIndex = (arrowCombinationIndex + 1) % 4
  }

  onMount(() => {
    x0 = document.body.clientWidth / 2
    y0 = document.body.clientHeight / 2

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('click', onClick)
    }
  })
</script>

<Arrow x0={x0} y0={y0} x1={x1} y1={y1} start={start} end={end} />