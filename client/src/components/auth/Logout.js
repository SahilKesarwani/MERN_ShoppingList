import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

export class Logout extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired,
	};

	render() {
		return (
			<React.Fragment>
				<NavLink onClick={this.props.logout} href="#">
					Logout
				</NavLink>
			</React.Fragment>
		);
	}
}

export default connect(null, { logout })(Logout);
