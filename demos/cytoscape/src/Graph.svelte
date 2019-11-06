<script>
  export let layout = 'random'
  let oldLayout = layout

  import { onMount, afterUpdate, setContext } from 'svelte'
  import cytoscape from 'cytoscape'
  import GraphStyles from './GraphStyles.js'

  let refElement = null
  let cyInstance = null

  setContext('graphSharedState', {
    getCyInstance: () => cyInstance
  })

  onMount(() => {
    cyInstance = cytoscape({
      container: refElement,
      style: GraphStyles
    })
  })

  afterUpdate(() => {
    if (cyInstance) {
      cyInstance
        .makeLayout({
          name: layout,
          animate: oldLayout !== layout,
          animationDuration: 3000,
          animationEasing: 'ease-in-out-quart'
        })
        .run()

      oldLayout = layout
    }
  })
</script>

<div class="graph" bind:this={refElement}>
  {#if cyInstance}
    <slot></slot>
  {/if}
</div>

<style>
  .graph {
    height: 100%;
  }
</style>