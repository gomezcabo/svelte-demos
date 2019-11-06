<script>
  import { getContext, onDestroy } from 'svelte'

  export let edge

  const { getCyInstance } = getContext('graphSharedState')
  const cyInstance = getCyInstance()

  cyInstance.add({
    group: 'edges',
    id: edge.id,
    data: { ...edge }
  })

  onDestroy(() => {
    cyInstance.remove(`#${edge.id}`)
  })
</script>