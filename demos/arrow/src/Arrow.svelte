<script>
  const ELEMENT_PADDING = 20

  export let x0
  export let y0
  export let x1
  export let y1
  export let start = 'H'
  export let end = 'H'

  $: width = Math.abs(x1 - x0) + ELEMENT_PADDING
  $: height = Math.abs(y1 - y0) + ELEMENT_PADDING
  $: viewBox = `0 0 ${width} ${height}`

  $: minX = Math.min(x0, x1)
  $: minY = Math.min(y0, y1)

  $: styles = `
    top: ${minY}px;
    left: ${minX}px;
    width: ${width}px;
    height: ${height}px;
  `

  $: coords = {
    x0: x0 - minX + ELEMENT_PADDING / 2,
    y0: y0 - minY + ELEMENT_PADDING / 2,
    x1: x1 - minX + ELEMENT_PADDING / 2,
    y1: y1 - minY + ELEMENT_PADDING / 2
  }
  $: moveFrom = `M${coords.x0},${coords.y0}`
  $: moveTo = `${coords.x1},${coords.y1}`

  $: controlPoint0 = start === 'H' ? `${coords.x1},${coords.y0}` : `${coords.x0},${coords.y1}`
  $: controlPoint1 = end === 'H' ? `${coords.x0},${coords.y1}` : `${coords.x1},${coords.y0}`

  $: arrowRotationAngle = end === 'H' ? (x1 > x0 ? 0 : 180) : (y1 > y0 ? 90 : -90)
  $: arrowTransform = `translate(${coords.x1} ${coords.y1}) rotate(${arrowRotationAngle})`

  $: path = `${moveFrom} C${controlPoint0} ${controlPoint1} ${moveTo}`
</script>

<style>
  .help-arrow {
    position: fixed;
    stroke: darkorange;
    pointer-events: none;
  }
</style>

<div class="help-arrow" style={styles}>
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}>
    <path stroke="" stroke-width="4" fill="transparent" d={path} />
    <circle cx={coords.x0} cy={coords.y0} r="4" stroke-width="4" fill="white"/>
    <path stroke-width="3" fill="none" d={`M -8,-8 l 8 8 l -8 8`} transform={arrowTransform}/>
  </svg>
</div>