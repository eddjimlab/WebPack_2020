import * as $ from 'jquery'
import './styles/styles.css'
import Post from './models/post';
import './babel'
// import json from './assets/json'
import AngularLogo from './assets/angular.png'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'
import './react.jsx'

const post = new Post('Webpack Post Title', AngularLogo)

$('pre').addClass('pre').html(post.toString())

console.log('Post to String', post.toString())

// console.log('JSON', json)
// console.log('XML', xml)
// console.log('CSV', csv)


