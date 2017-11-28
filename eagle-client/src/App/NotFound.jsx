import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from './adam-krowitz-389725.jpg';
import './App.css';
const NotFound = () => (
<div>
<h1 className="Lost-Island">ERROR you are STRANDED on Error 404 Island!</h1>
  
<img src={PageNotFound} style={{width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
<center><Link to="/"><h1 className="tooltip">Time to leave!
<span class="tooltiptext">Click on Me to Go Home!</span>
</h1></Link></center>
</div>
);
export default NotFound;