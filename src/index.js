import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BookReview from './BookReview'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route} from 'react-router-dom'
import 'tachyons'

const routes = (
        <BrowserRouter>
            <div>
                <Route path="/" component={App} exact={true} />
                <Route path="/book" component={BookReview} />
            </div>
        </BrowserRouter>

)


ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
