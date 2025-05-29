import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  FormText,  // Add this line to import FormText
} from "reactstrap";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector((state) => state.register);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    age: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = { name: "", email: "", password: "", age: "" };
    let isValid = true;

    if (!user.name) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!user.password || user.password.length < 6) {
      formErrors.password = "Password should be at least 6 characters";
      isValid = false;
    }

    if (!user.age || user.age <= 0) {
      formErrors.age = "Valid age is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(apis.register(user));
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        navigate("/dashboard/users");
      }, 2000);
    }
  }, [message, dispatch, navigate]);

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Register a user
          </CardTitle>
          <CardBody>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  onChange={handleChange}
                  id="name"
                  name="name"
                  placeholder="Name of the user"
                  type="text"
                  value={user.name}
                />
                {errors.name && <FormText color="danger">{errors.name}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  placeholder="Email of the user"
                  type="email"
                  value={user.email}
                />
                {errors.email && <FormText color="danger">{errors.email}</FormText>}
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  placeholder="Password of the user"
                  type="password"
                  value={user.password}
                />
                {errors.password && (
                  <FormText color="danger">{errors.password}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="role">User Role</Label>
                <Input
                  onChange={handleChange}
                  id="role"
                  name="role"
                  type="select"
                  value={user.role}
                >
                  <option>student</option>
                  <option>admin</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="age">Age</Label>
                <Input
                  onChange={handleChange}
                  id="age"
                  name="age"
                  placeholder="Age of the user"
                  type="number"
                  value={user.age}
                />
                {errors.age && <FormText color="danger">{errors.age}</FormText>}
              </FormGroup>
              {message && <Alert color="success">{message}</Alert>}
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterUser;
