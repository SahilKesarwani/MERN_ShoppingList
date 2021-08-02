import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../actions/itemActions";

export class ItemModal extends Component {
	state = {
		modal: false,
		name: "",
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onInputChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newItem = {
			name: this.state.name,
		};
		this.props.addItem(newItem);

		this.toggle();
	};

	render() {
		return (
			<div>
				{this.props.isAuthenticated ? (
					<Button color="dark" style={{ marginBottom: "2rem" }} onClick={this.toggle}>
						Add Item
					</Button>
				) : (
					<h4>Please Login or Register to manage items</h4>
				)}

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item">Item</Label>
								<Input type="text" name="name" id="item" placeholder="Add Item" autoComplete="off" onChange={this.onInputChange} />
								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Add Item
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
