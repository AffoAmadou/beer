//!Creo sta classe per avere un punto in commune in tutte le pagine cosi da avere la possibilità di chiamare i metodi 
//! una sola volta senza bisogno di chiamarli in tutte le pagine

import each from 'lodash/each'
import map from 'lodash/map'

import GSAP from 'gsap'
// import Prefix from 'prefix'

import Title from 'animations/Title'
import Paragraph from 'animations/Paragraph'
// import Label from 'animations/Label'
// import Section from 'animations/Section'
// import Preloader from '../components/Preloader'

// import AsyncLoad from './AsyncLoad'
export default class Page {

    constructor({ id, element, elements }) {
        this.id = id
        this.selector = element //! .about ad esempio passato da una delle pagine  
        this.selectorChildren = {
            ...elements,
            animationsTitles: '[data-animation="title"]',
            animationsParagraphs: '[data-animation="paragraph"]',
            animationsLabels: '[data-animation="label"]',
            animationsSection: '[data-animation="color"]',

            preloaders: '[data-src]'
        }

        // this.transformPrefix = Prefix('transform')

        //*Gestione dello scroll
        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0
        }
    }

    create() {
        this.element = document.querySelector(this.selector)
        this.elements = {}

        //*Gestione dello scroll
        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0
        }

        each(this.selectorChildren, (entry, key) => {
            if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
                this.elements[key] = entry //* se é gia un query selector lo passo direttamente
            }
            else {
                this.elements[key] = this.element.querySelectorAll(entry)

                if (this.elements[key].lenght === 0) {
                    this.elements[key] = null //*Se é vuoto ritorno null
                }
                else if (this.elements[key].lenght === 1) {
                    this.elements[key] = document.querySelector(entry)
                }
            }
            // console.log(this.elements[key], entry)

        })

        this.createAnimations()
        // this.createPreloader()
    }

    createAnimations() {
        this.animations = []

        //*Title
        this.animationsTitles = map(this.elements.animationsTitles, element => {
            return new Title({ element })
        })

        this.animations.push(...this.animationsTitles)

        //*Paragraphs
        console.log(this.elements.animationsParagraphs)
        this.animationsParagraphs = map(this.elements.animationsParagraphs, element => {
            return new Paragraph({ element })
        })

        this.animations.push(...this.animationsParagraphs)

        console.log(this.elements.pink[0])

        if(this.elements.pink[0]) {
           GSAP.to(this.elements.pink[0], {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: 'none'
        })
        }
        // //*SUBParagraphs
        // this.animationsSection = map(this.elements.animationsSection, element => {
        //     return new Section({ element })
        // })

        // this.animations.push(...this.animationsSection)


        // //*Labels
        // this.animationsLabels = map(this.elements.animationsLabels, element => {
        //     return new Label({ element })
        // })
        // this.animations.push(...this.animationsLabels)
    }

    createPreloader() {
        // this.preloaders = map(this.elements.preloaders, element => {
        //     return new AsyncLoad({ element }) //!CREARE LE IMMAGINI DOPO CAMBIO PAGINA
        // })
    }

    /**
     * //!Animation
     */
    show(animation) {
        return new Promise(resolve => {


            if (animation) {
                this.animationIn = animation
            } else {
                this.animationIn = GSAP.timeline()
                this.animationIn.fromTo(this.element, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    // onComplete: resolve
                })
            }



            this.animationIn.call(_ => {
                this.addEventListeners()
            })
        })
    }

    hide() {
        return new Promise(resolve => {

            this.destroy()
            this.animationOut = GSAP.timeline()

            this.animationOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve
            })
        })
    }

    destroy() {

    }

    /**
     * //!Event
     */
    //*Debug dello scroll per lo smoothscroll

    onWheel({ pixelY }) {
        // this.scroll.target += pixelY
    }

    onResize() {
        // if (this.elements.wrapper) {
        //     this.scroll.limit = this.elements.wrapper[0].clientHeight - window.innerHeight
        // }

        // each(this.animations, animation => animation.onResize())
    }

    /**
     * //!Loop
     */
    update() {
        // this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)


        // this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

        // if (this.scroll.current < 0.01) {
        //     this.scroll.current = 0
        // }

        // if (this.elements.wrapper) {
        //     this.elements.wrapper[0].style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
        // }
    }

    /**
     * //!Listeners
     */
    addEventListeners() {
    }

    removeEventListeners() {
    }

    //* Fine debug dello scroll

    /**
     * //!Destroy
     */

    destroy() {
        this.removeEventListeners()
    }
}




