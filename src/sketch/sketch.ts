import p5 from 'p5'

const sketch = function (p: p5) {
  let wr: WaveRipple

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    const base = p.width < p.height ? p.width : p.height
    const r = (base/2) * 0.6
    wr = new WaveRipple(p.width / 2, p.height / 2, r)
  }

  p.draw = () => {
    p.background(255)
    wr.update()
    wr.draw()
  }

  class WaveRipple {
    position: p5.Vector
    r: number
    amplitude: number
    cnt: number

    constructor(cx: number, cy: number, r: number, amplitude=0.1) {
      this.position = p.createVector(cx, cy)
      this.r = r
      this.amplitude = amplitude
      this.cnt = 0
    }
  
    update() {
      const mouse = p.createVector(p.mouseX, p.mouseY)
      const dir = p5.Vector.sub(mouse, this.position)
      this.cnt ++
    }
    
    draw() {
      p.push()
      {
        p.translate(this.position.x, this.position.y)
        p.noFill()
        p.strokeWeight(3)
        const rDiv = this.r * this.amplitude
        const base = 10+this.cnt*0.03
        p.beginShape()
        for (let angle = 0; angle < p.TWO_PI; angle += 0.01) {
          let noiseX = (p.cos(angle) * 10) + base
          let noiseY = (p.sin(angle) * 10) + base
          let noiseZ = this.cnt * 0.03
          let noise = p.map(p.noise(noiseX, noiseY, noiseZ), 0, 1, -1, 1)
          let r = this.r + (rDiv * noise)
          let x = r * p.cos(angle)
          let y = r * p.sin(angle)
          p.vertex(x,y)
        }
        p.endShape()
        p.ellipseMode(p.RADIUS)
      }
      p.pop()
    }
  }
}

export default sketch