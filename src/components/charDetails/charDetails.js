import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const CharDetailsBlock = styled.div`
	background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
	border-radius: 0.25rem;
	h4 {
		margin-bottom: 20px;
  	text-align: center;
	}
`;

const BoldSpan = styled.span`
	font-weight: bold;
`;

const SelectError = styled.span`
  color: #fff;
  text-align: center;
  font-size: 26px;
	}
`;

const Field = ({ char, field, label }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<BoldSpan>{label}</BoldSpan>
			<span>{char[field]}</span>
		</li>
	)
}

export {
	Field
}

export default class CharDetails extends Component {

	gotService = new gotService();

	state = {
		char: null,
		loading: true,
		error: false
	}
	

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	onCharDetailsLoaded = (char) => {
		this.setState({
			char,
			loading: false
		})
	}

	updateChar() {
		const { charId } = this.props;
		if (!charId) {
			return;
		}

		this.setState({
			loading: true
		})

		this.gotService.getCharacter(charId)
			.then(this.onCharDetailsLoaded)
			.catch(() => this.onError())
	}

	onError() {
		this.setState({
			char: null,
			error: true
		})
	}

    render() {

			if (!this.state.char && this.state.error) {
				return <ErrorMessage />
			} else if (!this.state.char) {
				return <SelectError>Please select a character</SelectError>
			}

			const { char } =this.state;
			const { name } = char;

			if (this.state.loading) {
				return <Spinner />
			}

        return (
					<CharDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
									{
										React.Children.map(this.props.children, (child) => {
											return React.cloneElement(child, {char})
										})
									}
                </ul>
            </CharDetailsBlock>
        );
    }
}