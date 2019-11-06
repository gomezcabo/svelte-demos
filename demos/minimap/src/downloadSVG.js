const downloadSVG = svgElement => {
  const svgData = svgElement.outerHTML
  const svgBlob = new Blob([ svgData ], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)

  const downloadLink = document.createElement('a')
  downloadLink.href = svgUrl
  downloadLink.download = 'minimap.svg'

  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

export default downloadSVG
