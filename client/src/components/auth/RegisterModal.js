import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export class RegisterModal extends Component {
	state = {
		modal: false,
		name: "",
		email: "",
		password: "",
		message: null,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired,
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			// Check for Register Fail error
			if (error.id === "REGISTER_FAIL") {
				this.setState({ message: error.message.message });
			} else {
				this.setState({ message: null });
			}
		}

		// Close modal if authenticated
		if (this.state.modal) {
			if (isAuthenticated) {
				this.toggle();
			}
		}
	}

	toggle = () => {
		// Clear Errors
		this.props.clearErrors();

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

		// Register New User
		const { name, email, password } = this.state;
		const newUser = { name, email, password };
		this.props.register(newUser);
	};

	render() {
		return (
			<React.Fragment>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						{this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="name">
									Name <span style={{ fontSize: "0.6rem" }}>(max 20 characters)</span>
								</Label>
								<Input type="text" name="name" id="name" placeholder="Name" autoComplete="off" maxLength="20" className="mb-3" onChange={this.onInputChange} />

								<Label for="email">Email</Label>
								<Input type="email" name="email" id="email" placeholder="Email" className="mb-3" onChange={this.onInputChange} />

								<Label for="password">
									Password <span style={{ fontSize: "0.6rem" }}>(should more than 6 characters)</span>
								</Label>
								<Input type="password" name="password" id="password" placeholder="Password" minLength="6" className="mb-3" onChange={this.onInputChange} />

								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Register
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
