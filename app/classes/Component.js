//!Creo sta classe per avere un punto in commune in tutte le pagine cosi da avere la possibilità di chiamare i metodi 
//! una sola volta senza bisogno di chiamarli in tutte le pagine

import each from 'lodash/each'
import GSAP from 'gsap'
import EventEmitter from 'events'

export default class Component extends EventEmitter {

    constructor({ element, elements }) {
        super()
        this.selector = element
        this.selectorChildren = {
            ...elements
        }
        this.create()

        this.addEventListeners()
    }

    //? Metodo per creare una pagina ed ottenere tutti gli elementi utili per le animazioni etc
    create() {
        if (this.selector instanceof window.HTMLElement) {
            this.element = this.selector
        } else {
            this.element = document.querySelector(this.selector)
        }
        this.elements = {}


        each(this.selectorChildren, (entry, key) => {
            if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
                this.elements[key] = entry
            }
            else {
                this.elements[key] = document.querySelectorAll(entry)

                if (this.elements[key].lenght === 0) {
                    this.elements[key] = null
                }
                else if (this.elements[key].lenght === 1) {
                    this.elements[key] = querySelector(entry)

                }
            }
            // console.log(this.elements[key], entry)

        })

    }

    addEventListeners() {


    }

    removeEventListeners() {

    }

}
