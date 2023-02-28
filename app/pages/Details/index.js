import Page from "classes/Page";

export default class Home extends Page {

    constructor() {
        super({
            id: 'details',
            element: '.detail',
            elements: {
                navigation: document.querySelector('.navigation'),
                name: '.details__title',
                description: '.details__description',
                // wrapper:'.home__wrapper'

            }
        })
    }

    create() {
        super.create()

        // this.elements.links[0].addEventListener('click', _ => console.log('OH YOU CLICKED'))
    }
}