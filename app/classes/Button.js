import Component from './Component'
import GSAP from 'gsap'

export default class Button extends Component {
    constructor({ element }) {
        super({ element })

        this.timeline = GSAP.timeline()
        
    }

    onMouseEnter() {
    }

    onMouseLeave() {
    }
    addEventListeners() {
        this.element.addEventListener('mouseenter', this.onMouseEnter)
        this.element.addEventListener('mouseenter', this.onMouseLeave)

    }

    removeEventListeners() {
        this.element.removeEventListener('mouseenter', this.onMouseEnter)
        this.element.removeEventListener('mouseenter', this.onMouseLeave)

    }
}