import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";

export class AppNavbar extends Component {
	state = { isOpen: false };

	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<React.Fragment>
				<NavItem className="d-none d-sm-inline">
					<span className="navbar-text mr-3">
						<strong>{user ? `Welcome ${user.name}` : ""}</strong>
					</span>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</React.Fragment>
		);

		const guestLinks = (
			<React.Fragment>
				<NavItem>
					<RegisterModal />
				</NavItem>
				<NavItem>
					<LoginModal />
				</NavItem>
			</React.Fragment>
		);

		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">ShoppingList</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="mr-auto" navbar>
								<NavItem>
									<NavLink href="https://github.com/SahilKesarwani" target="_blank">
										Github
									</NavLink>
								</NavItem>
							</Nav>
							<Nav className="ml-auto" navbar>
								{isAuthenticated ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(AppNavbar);
