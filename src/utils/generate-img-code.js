// 生成图片验证码
// 生成并渲染出验证码图形
function draw (canvas) {
  const context = canvas.getContext('2d') // 获取到canvas画图的环境，演员表演的舞台
  const sCode = 'a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'
  const aCode = sCode.split(',')
  const aLength = aCode.length // 获取到数组的长度
  const canvasW = canvas.getBoundingClientRect().width
  const canvasH = canvas.getBoundingClientRect().height
  canvas.width = canvasW
  canvas.height = canvasH
  let imgCode = ''
  for (let i = 0; i < 4; i++) { // 这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
    const j = Math.floor(Math.random() * aLength) // 获取到随机的索引值
    const deg = Math.random() - 0.5 // 产生一个随机弧度
    const txt = aCode[j] // 得到随机的一个内容
    imgCode += txt.toLowerCase()
    const step = canvasW / 4 // 跨度
    const x = (step - Math.random() * step / 8) * i || Math.random() * step / 2 // 文字在canvas上的x坐标
    const y = 22 + Math.random() * 5 // 文字在canvas上的y坐标
    context.font = 'bold 23px 微软雅黑'
    context.translate(x, y)
    context.rotate(deg)
    context.fillStyle = randomColor()
    context.fillText(txt, 0, 0)
    context.rotate(-deg)
    context.translate(-x, -y)
  }
  for (let i = 0; i <= 5; i++) { // 验证码上显示线条
    context.strokeStyle = randomColor()
    context.beginPath()
    context.moveTo(Math.random() * canvasW, Math.random() * canvasH)
    context.lineTo(Math.random() * canvasW, Math.random() * canvasH)
    context.stroke()
  }
  for (let i = 0; i <= 30; i++) { // 验证码上显示小点
    context.strokeStyle = randomColor()
    context.beginPath()
    const x = Math.random() * canvasW
    const y = Math.random() * canvasH
    context.moveTo(x, y)
    context.lineTo(x + 1, y + 1)
    context.stroke()
  }
  return imgCode
}

// 得到随机的颜色值
function randomColor () {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

export default draw
