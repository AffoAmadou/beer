
import About from 'pages/Beers'
import each from 'lodash/each'
import Home from 'pages/Home'
import Beers from 'pages/Beers'
import Detail from 'pages/Details'
// import Preloader from 'components/Preloader'
// import Detection from 'classes/Detection'

// import NormalizeWheel from 'normalize-wheel'


// import Canvas from 'components/Canvas'
//* IMPORTO GLI INDEX PRESENTI NELLE CARTELLE

class App {
    constructor() {
        this.createContent() //! Questo metodo mi permette di creare il content e cosi da recuperare il data-template 
        //! E percio sapere in che pagina mi trovo

        // this.createCanvas()
        // this.createPreloader()
        // // this.createNavigation()
        this.createPages()
        // this.addEventListeners()
        // this.addLinkListeners()

        //  this.onResize()

        this.update()
    }

    /**
     * //*Events
     */
    createPreloader() {
        this.preloader = new Preloader({
            canvas: this.canvas
        })

        //*Event Emitter quando il preloader ha caricato le immagini chiamo il metodo che sta qui sotto
        this.preloader.once('complete', this.onPreloaded.bind(this))
    }

    createCanvas() {
        this.canvas = new Canvas({
            template: this.template
        })
    }

    createContent() {
        //?Qui eseguo il create content per sapere in quale pagina mi trovo attualmente
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    //? I questo modo creo l'oggetto PAGINA
    createPages() {
        this.pages = {
            beers: new Beers(),
            home: new Home(),
            details: new Detail(),
        }

        this.page = this.pages[this.template] //?INSERISCO LA PAGINA IN CUI SONO ATTUALMENTE
        // console.log(this.page)
        this.page.create() //? Chiamo il create nella classe page che é legata ad ognuna delle pagine

        // this.page.hide()

    }

    onPreloaded() {
        this.canvas.onPreloaded()
        this.onResize()
        this.page.show()
    }

    onPopState() {
        this.onChange({
            url: window.location.pathname,
            push: false
        })
    }

    async onChange({ url, push = true }) {
        // console.log(url)
        this.canvas.onChangeStart(this.template, url)
        await this.page.hide()

        const request = await window.fetch(url)

        if (request.status === 200) { //!200 = pagina ben caricata
            const html = await request.text() //!recupero il contenuto della pagina

            const div = document.createElement('div') //!Creo una div per metterci la parte del "html" che voglio
            //!cosi da non mettere anche i doctype etc 

            if (push) {
                window.history.pushState({}, '', url)
            }

            div.innerHTML = html

            const divContent = div.querySelector('.content')//! Recupero solo il .content che contiene la parte di divs che cambia in ogni pagina

            this.template = divContent.getAttribute('data-template')


            this.content.setAttribute('data-template', this.template);//*Cambio il data-template per far sapere che sono in questa pagina attualmente
            this.content.innerHTML = divContent.innerHTML //! E lo inserisco nel content della pagina in cui sono ora

            this.canvas.onChangeEnd(this.template)

            this.page = this.pages[this.template] //!Riassegno la pagina

            this.page.create() //? Chiamo il create nella classe page che é legata ad ognuna delle pagine

            this.onResize()

            this.page.show()

            this.addLinkListeners()
        }
        else {
            console.log("error")
        }

    }

    onResize() {
        if (this.canvas && this.canvas.onResize) {
            this.canvas.onResize()
        }
        window.requestAnimationFrame(_ => {
            if (this.page && this.page.onResize) {
                this.page.onResize()
            }
        })
    }

    onTouchDown(event) {
        if (this.canvas && this.canvas.onTouchDown) {
            this.canvas.onTouchDown(event)
        }
    }
    onTouchMove(event) {
        if (this.canvas && this.canvas.onTouchMove) {
            this.canvas.onTouchMove(event)
        }
    }
    onTouchUp(event) {
        if (this.canvas && this.canvas.onTouchUp) {
            this.canvas.onTouchUp(event)
        }
    }

    onWheel(event) {
        const normalizedWheel = NormalizeWheel(event) //* Per normalizzare la velocita in ogni browser

        if (this.canvas && this.canvas.onWheel) {
            this.canvas.onWheel(normalizedWheel)
        }

        if (this.page && this.page.onWheel) {
            this.page.onWheel(normalizedWheel)
        }

    }

    /**
     * //*LOOP
     */

    update() {

        if (this.page && this.page.update) {
            this.page.update()
        }

        if (this.canvas && this.canvas.update) {
            this.canvas.update(this.page.scroll)
        }

        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

    /**
     * //*LISTENERS
     */
    addEventListeners() {

        window.addEventListener('mousewheel', this.onWheel.bind(this))

        window.addEventListener('popstate', this.onPopState.bind(this))

        window.addEventListener('mousedown', this.onTouchDown.bind(this))
        window.addEventListener('mousemove', this.onTouchMove.bind(this))
        window.addEventListener('mouseup', this.onTouchUp.bind(this))

        window.addEventListener('touchstart', this.onTouchDown.bind(this))
        window.addEventListener('touchmove', this.onTouchMove.bind(this))
        window.addEventListener('touchend', this.onTouchUp.bind(this))

        window.addEventListener('resize', this.onResize.bind(this))
    }

    addLinkListeners() {
        const links = document.querySelectorAll('a') //! Recupero tutti i link della pagina 
        console.log(links)
        each(links, link => {
            link.onclick = event => {
                const { href } = link
                event.preventDefault() //!all click non eseguo il cambio di pagina come dovrebbe esserer

                this.onChange({ url: href })//*Funzione che si trova sopra Per gestire il cambio di pagina
                 console.log(event, href)
            }
        })
    }
}

new App()