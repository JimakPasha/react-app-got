import React from 'react';
import styled from 'styled-components';

const SpinnerBlock = styled.div`
@keyframes ldio-azmk6r546bn {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
}
	margin-left: 50%;
	transform: translateX(-50%);
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
	div {
		width: 100%;
  	height: 100%;
  	position: relative;
  	transform: translateZ(0) scale(1);
  	backface-visibility: hidden;
  	transform-origin: 0 0;
		div{
			position: absolute;
  		animation: ldio-azmk6r546bn 1s linear infinite;
  		width: 160px;
  		height: 160px;
  		top: 20px;
  		left: 20px;
  		border-radius: 50%;
  		box-shadow: 0 4px 0 0 #0a202f;
  		transform-origin: 80px 82px;
			box-sizing: content-box;
		}
	}
`;

const Spinner = () => {
	return (
		<SpinnerBlock class="loadingio-spinner-eclipse-e28udfkokwi"><div class="ldio-azmk6r546bn">
			<div></div>
		</div></SpinnerBlock>
	)
}

export default Spinner;