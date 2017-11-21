import React from 'react';

const Background = () => (
	<div id="bg" style={{backgroundImage: `url(./img/bg${Math.floor(Math.random()*5)+1}.jpg)`}}></div>
)

export default Background;
