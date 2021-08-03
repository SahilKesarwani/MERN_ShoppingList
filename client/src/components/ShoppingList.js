import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, clearItems } from "../actions/itemActions";
import PropTypes from "prop-types";

export class ShoppingList extends Component {
	static propTypes = {
		getItems: PropTypes.func.isRequired,
		item: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool,
		user: PropTypes.object,
	};

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.getItems(this.props.user.id);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
			if (this.props.isAuthenticated) {
				this.props.getItems(this.props.user.id);
			} else {
				this.props.clearItems();
			}
		}
	}

	onDeleteItem(id) {
		this.props.deleteItem(id);
	}

	render() {
		const { items } = this.props.item;
		return (
			<Container>
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({ _id, name }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
									<Button className="remove-btn mr-2" color="danger" size="sm" onClick={() => this.onDeleteItem(_id)}>
										&times;
									</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item,
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem, clearItems })(ShoppingList);
