import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
	background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
	h4 {
  	margin-bottom: 20px;
    text-align: center;
	}
`;

const BoldSpan = styled.span`
	font-weight: bold;
`;

export default class RandomChar extends Component {

	gotService = new gotService();

	state = {
		char: {},
		loading: true,
		error: false
	};

	componentDidMount() {
		this.updateChar();
		this.timerId = setInterval(this.updateChar, 1500);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false
		});
	}

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		})
	}

	updateChar = () => {
		const id = Math.floor(Math.random()*140 + 25);
		this.gotService.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render() {

		const {char, loading, error} = this.state;

		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ?  <View char={char}/> : null;

			return (
				<RandomBlock className="rounded">
					{errorMessage}
					{spinner}
					{content}
				</RandomBlock>
			);
	}
}

const View = ({char}) => {
	const {name, gender, born, died, culture} = char;
	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<BoldSpan>Gender </BoldSpan>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<BoldSpan>Born </BoldSpan>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<BoldSpan>Died </BoldSpan>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<BoldSpan>Culture </BoldSpan>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	)
}