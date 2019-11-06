<div class="app">
  <div>
    <select bind:value={layout}>
      <option value="random">Random</option>
      <option value="grid">Grid</option>
      <option value="circle">Circle</option>
      <option value="concentric">Concentric</option>
      <option value="breadthfirst">Breadthfirst</option>
    </select>
    <button on:click={addNode}>Add Node</button>
    <button on:click={reset}>Reset</button>
  </div>

  <Graph layout={layout}>
    {#each nodes as node}
      <GraphNode node={node}/>
    {/each}

    {#each edges as edge}
      <GraphEdge edge={edge}/>
    {/each}
  </Graph>
</div>

<script>
  import Graph from './Graph.svelte'
  import GraphNode from './GraphNode.svelte'
  import GraphEdge from './GraphEdge.svelte'

  let nodes = []
  let edges = []
  let layout = 'grid'

  $: nextNodeId = nodes.length + 1
  $: nextEdgeId = edges.length + 1

  const randomNumber = (max = 100) => Math.round(max * Math.random())

  const addNode = () => {
    const newNode = { id: `N${nextNodeId}`, label: nextNodeId }

    nodes = [...nodes, newNode]

    if (nodes.length >= 2) {
      const randomNode = nodes[randomNumber(nodes.length - 2)]
      edges = [ ...edges,	{ id: `E${nextEdgeId}`, source: randomNode.id, target: newNode.id }]
    }
  }

  const reset = () => {
    nodes = []
    edges = []
  }
</script>

<style>
  .app {
     display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>