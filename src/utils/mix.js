// 让滚动的节点滚动到中间
function makeScrollNodeScrollToMiddle (childNode, parentNode, offsetX = 0) {
  const needScrollX = childNode.offsetLeft + offsetX + childNode.clientWidth / 2 - (parentNode.clientWidth / 2)
  if (parentNode.scrollTo) parentNode.scrollTo(needScrollX, 0)
  else parentNode.scrollLeft = needScrollX
}
export {
  makeScrollNodeScrollToMiddle
}
