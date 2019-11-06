<textarea bind:this={editorRef} value={code}></textarea>

<script>
  import loader from './loader.js'
  import { onMount, afterUpdate } from 'svelte'

  export let code = ''

  let editor
  let editorRef

  onMount(async () => {
    await loader.js('https:\//cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/codemirror.min.js')
    await Promise.all([
      loader.css('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/codemirror.min.css'),
      loader.css('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/theme/material.min.css'),
      loader.css('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/addon/scroll/simplescrollbars.min.css'),
      loader.js('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/mode/xml/xml.min.js'),
      loader.js('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/mode/javascript/javascript.min.js'),
      loader.js('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/mode/css/css.min.js'),
      loader.js('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/mode/jsx/jsx.min.js'),
      loader.js('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/mode/htmlmixed/htmlmixed.min.js'),
      loader.js('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/addon/scroll/simplescrollbars.min.js'),
      loader.js('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/addon/display/placeholder.min.js')
    ])

    editor = CodeMirror.fromTextArea(editorRef, {
      lineNumbers: true,
      mode:  'htmlmixed',
      scrollbarStyle: 'simple',
      placeholder: 'Write your code here'
    })

    editor.on('change', function () {
      code = editor.getValue()
    })
 })
</script>

<style>
  :global(.CodeMirror-simplescroll-horizontal, .CodeMirror-simplescroll-vertical) {
    background: transparent !important;
  }

  :global(.CodeMirror-simplescroll-horizontal div, .CodeMirror-simplescroll-vertical div) {
    background: gray !important;
    opacity: 0.7 !important;
    border: 0 !important;
  }

  :global(.CodeMirror-gutter-filler, .CodeMirror-scrollbar-filler) {
    background: transparent !important;
  }

  :global(.CodeMirror) {
    font-family: monospace !important;
    font-size: 12px !important;
    border: 1px solid lightgray !important;
    border-bottom: 1px solid lightgray !important;
    margin-bottom: 10px;
}
</style>
