<h2>Minimap generator</h2>
<CodeMirrorEditor bind:code={code}/>

{#if blocks.length}
  <button on:click={() => downloadSVG(svgElement)}>
    Download SVG
  </button>
{/if}

<pre>
  <!--{JSON.stringify(blocks, null, 2)}-->
</pre>

<svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  bind:this={svgElement}
  width={svgWidth}
  height={svgHeight}
>
  {#each blocks as { x, y, width, height, color }}
    <rect x={x} y={y} width={width} height={height} fill={color}/>
  {/each}
</svg>

<script>
  import CodeMirrorEditor from './CodeMirrorEditor.svelte'
  import lexer, { colorForToken } from './lexer.js'
  import downloadSVG from './downloadSVG.js'

  const BLOCK_WIDTH = 8
  const BLOCK_HEIGHT = 10

  // DOM element ref
  let svgElement

  // Editor's code
  let code = ''

  // SVG elements and attributes
  let blocks = []
  let svgHeight
  let svgWidth

  $: tokens = lexer.collect(code)

  $: if (tokens) {
    let currentX = 0
    let currentY = 0

    blocks = tokens
      .map(token => {
        const block = {
          token,
          x: currentX,
          y: currentY,
          width: BLOCK_WIDTH * token.length,
          height: BLOCK_HEIGHT,
          color: colorForToken(token)
        }

        currentX = token.type === 'ENTER' ? 0 : currentX + block.width
        currentY = token.type === 'ENTER' ? currentY + 2 * BLOCK_HEIGHT : currentY

        return !['ENTER', 'SPACE'].includes(token.type)
          ? block
          : null
      })
      .filter(block => block !== null)

    const enterTokens = tokens.filter(token => token.type === 'ENTER').length
    svgHeight = blocks.length > 0 ? (2 * enterTokens + 1) * BLOCK_HEIGHT : 0
    svgWidth = blocks.length > 0 ? Math.max(...blocks.map(block => block.x + block.width)) : 0
  }
</script>
