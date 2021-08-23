import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editItem } from "../actions/itemActions";

export class EditItemModal extends Component {
	state = {
		modal: false,
		name: "",
	};

	static propTypes = {
		user: PropTypes.object,
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
		const editedItem = {
			name: this.state.name,
		};
		this.props.editItem(this.props.id, editedItem);

		this.setState({ name: "" });
		this.toggle();
	};

	render() {
		return (
			<>
				<Button className="edit-btn mr-2" color="primary" size="sm" onClick={this.toggle}>
					&#9999;
				</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="edit-item">Item</Label>
								<Input type="text" name="name" id="edit-item" placeholder="Edit Item" autoComplete="off" onChange={this.onInputChange} />
								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Edit
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item,
	user: state.auth.user,
});

export default connect(mapStateToProps, { editItem })(EditItemModal);
