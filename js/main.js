const obj_num = document.getElementById("obj_num")
const qnt_txt = document.getElementById("qnt_txt")
const add_btn = document.getElementById("add_btn")
const btn_remove = document.getElementById("btn_remove")
const tela_das_bolinhas = document.getElementById("tela_das_bolinhas")

let widthScreen = tela_das_bolinhas.offsetWidth
let heightScreen = tela_das_bolinhas.offsetHeight
let balls = []
let ballNum = 0

alert("Abra seu gerenciador de tarefas para monitorar o uso de RAM e processador.")

class Ball{
    constructor(arrayBalls, tela_das_bolinhas){
        // Tamanho das bolinhas
        this.tam = Math.floor(Math.random() * 15) + 10

        // Cor das bolinhas
        this.r = Math.floor(Math.random() * 255)
        this.g = Math.floor(Math.random() * 255)
        this.b = Math.floor(Math.random() * 255)

        // Máximo que as bolinhas podem chegar na tela
        this.px = Math.floor(Math.random() * widthScreen - this.tam)
        this.py = Math.floor(Math.random() * heightScreen - this.tam)

        // Velocidade das bolinhas
        this.velx = Math.floor(Math.random() * 3) + 0.3
        this.vely = Math.floor(Math.random() * 3) + 0.3

        //Direção das bolinhas
        this.dirx = (Math.random() * 10) > 5 ? 1 : -1
        this.diry = (Math.random() * 10) > 5 ? 1 : -1

        this.tela_das_bolinhas = tela_das_bolinhas
        this.arrayBalls = arrayBalls
        this.id = Date.now + "_" + Math.floor(Math.random() * 1000000000)
        this.drawing()
        this.control = setInterval(this.controling.bind(this), 10)
        this.eu = document.getElementById(this.id)
        ballNum++
        obj_num.innerHTML = ballNum
    }

    myPos = () => {
        return this.arrayBalls.indexOf(this)
    }

    remove = () => {
        clearInterval(this.control)
        this.balls = balls.filter((b) => {
            if(b.id !== this.id){
                return b
            }
        })
        this.eu.remove()
        ballNum--
        obj_num.innerHTML = ballNum
    }

    drawing = () => {
        const div = document.createElement("div")
        div.setAttribute("id", this.id)
        div.setAttribute("class", "ball")
        div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        this.tela_das_bolinhas.appendChild(div);

    }

    border_crash = () => {
        if(this.px + this.tam >= widthScreen){
            this.dirx = -1
        } else if(this.px <= 0){
            this.dirx = 1
        }

        if(this.py + this.tam >= heightScreen){
            this.diry = -1
        } else if(this.py <= 0){
            this.diry = 1
        }
    }

    controling = () => {
        this.border_crash()
        this.px += this.dirx * this.velx
        this.py += this.diry * this.vely
        this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        if((this.px > widthScreen) || (this.py > heightScreen)){
            this.remove()
        }
    }
}

window.addEventListener("resize", (evt) => {
    widthScreen = tela_das_bolinhas.offsetWidth
    heightScreen = tela_das_bolinhas.offsetHeight
})

add_btn.addEventListener("click", (evt) => {
    const qnt = qnt_txt.value
    for(let i = 0; i < qnt; i++){
        balls.push(new Ball(balls, tela_das_bolinhas))
    }
})

btn_remove.addEventListener("click", (evt) => {
    balls.map((b) => {
        b.remove()
    })
})