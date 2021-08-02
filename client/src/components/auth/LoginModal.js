import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export class LoginModal extends Component {
	state = {
		modal: false,
		email: "",
		password: "",
		message: null,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired,
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			// Check for Login Fail error
			if (error.id === "LOGIN_FAIL") {
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

		// Login User
		const { email, password } = this.state;
		const user = { email, password };
		this.props.login(user);
	};

	render() {
		return (
			<React.Fragment>
				<NavLink onClick={this.toggle} href="#">
					Login
				</NavLink>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
						{this.state.message ? <Alert color="danger">{this.state.message}</Alert> : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="email">Email</Label>
								<Input type="email" name="email" id="email" placeholder="Email" className="mb-3" onChange={this.onInputChange} />

								<Label for="password">Password</Label>
								<Input type="password" name="password" id="password" placeholder="Password" className="mb-3" onChange={this.onInputChange} />

								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Login
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
