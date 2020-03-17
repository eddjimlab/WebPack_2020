export default class Post {
    constructor(title, img) {
        this.img = img
        this.title = title
        this.date = new Date()
    }
    toString(){
      return  JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
          img: this.img
        }, null, 2)
    }
    get uppercaseTitle() {
      return  this.title.toUpperCase()
    }
}
