import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, clearItems } from "../actions/itemActions";
import EditItemModal from "./EditItemModal";
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
		const { isAuthenticated, user } = this.props;
		if (isAuthenticated !== prevProps.isAuthenticated) {
			if (isAuthenticated) {
				if (user) {
					if (user.id) this.props.getItems(user.id);
				}
			} else {
				this.props.clearItems();
			}
		}
		if (user !== prevProps.user && isAuthenticated) {
			if (user) {
				if (user._id) this.props.getItems(user._id);
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
							<CSSTransition key={_id} classNames="fade">
								<ListGroupItem>
									<Button className="remove-btn mr-2" color="danger" size="sm" onClick={() => this.onDeleteItem(_id)}>
										&times;
									</Button>
									<EditItemModal id={_id} name={name} />
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
