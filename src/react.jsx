import React from 'react'
import {render} from 'react-dom'

const App = () => (
    <div id="reactModule">
        <h1 className="react">React js</h1>
    </div>
)
render(<App/>, document.getElementById('reactModule'))
