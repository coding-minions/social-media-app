import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as postActions from "../../store/actions/postActions";

const PostComponent = props => {
  let name = "";

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Post Name</Form.Label>
          <Form.Control
            type="text"
            onChange={event => (name = event.target.value)}
            placeholder="enter post name"
          ></Form.Control>
        </Form.Group>

        <Button variant="success" onClick={() => props.addPost(name)}>
          Add
        </Button>
      </Form>

      <p>{props.post}</p>
    </>
  );
};

const mapStateToProps = state => {
  return {
    post: state.postReducer.name
  };
};

const dispatchToProps = dispatch => {
  console.log(dispatch);
  return {
    addPost: name =>
      dispatch({
        type: postActions.ADD_POST,
        payload: { name: name }
      })
  };
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(PostComponent);
