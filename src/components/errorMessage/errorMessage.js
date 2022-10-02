import React from 'react';
import styled from 'styled-components';
import img from './error.jpg';

const ErrorBlock = styled.div`
	img {
		width: 100%;
	}
`;

const ErrorMessage = () => {
	return (
		<ErrorBlock>
			<img src={img} alt="error"/>
			<span>Something goes wrong</span>
		</ErrorBlock>
	)
}

export default ErrorMessage;