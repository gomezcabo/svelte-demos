<script>
  import { getContext, onDestroy } from 'svelte'

  export let node

  const { getCyInstance } = getContext('graphSharedState')
  const cyInstance = getCyInstance()

  cyInstance.add({
    group: 'nodes',
    id: node.id,
    data: { ...node }
  })

  onDestroy(() => {
    cyInstance.remove(`#${node.id}`)
  })
</script>
