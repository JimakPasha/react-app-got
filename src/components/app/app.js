import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';
import styled from 'styled-components';

const WrapperBlock = styled.div`
	a {
		color: inherit;
		text-decoration: none;
	}
	a:visited {
		text-decoration: none;
		color: inherit;
	}
	a:hover {
		text-decoration: none;
		color: inherit;
	}
	a:focus {
		text-decoration: none;
		color: inherit;
	}
	a:active {
		text-decoration: none;
		color: inherit;
	}
`;

const Button = styled.button`
	outline: transparent;
	margin-bottom: 80px;
	width: 220px;
	height: 50px;
	background: linear-gradient(45deg, rgb(227, 231, 232), rgb(23, 45, 59));
	box-shadow: 0 0 10px 10px rgba(34, 60, 80, 0.6);
	border-radius: 15px;
	color: #fff;
	transition: all .3s;
	:active {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(34, 60, 80, 0.6);
	}
	:focus {
		outline:none;
	}
`;

export default class App extends Component {

	gotService = new gotService();

	state = {
		showRandomChar: true,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	toggleRandomChar = () => {
		this.setState((state) => {
			return {
				showRandomChar: !state.showRandomChar
			}
		});
	}

	render() {

		const { showRandomChar } = this.state;
		const char = showRandomChar ? <RandomChar /> : null;

		if (this.state.error) {
			return <ErrorMessage />;
		}

		return (
			<WrapperBlock>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 6, offset: 0 }}>
							{char}
							<Button onClick={this.toggleRandomChar}>Toggle random character</Button>
						</Col>
					</Row>
					<CharacterPage />
					<Row>
						<Col md='6'>
							<ItemList
								onItemSelected={this.onItemSelected}
								getData={this.gotService.getAllBooks}
								renderItem={(item) => item.name}
							/>
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
					<Row>
						<Col md='6'>
							<ItemList
								onItemSelected={this.onItemSelected}
								getData={this.gotService.getAllHouses}
								renderItem={(item) => item.name}
							/>
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
				</Container>
			</WrapperBlock>
		);
	}
};
