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
  FormText,
  Alert,
} from "reactstrap";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";

const RegisterCourse = () => {
  const dispatch = useDispatch();

  const { loading, message } = useSelector((state) => state.createCourse);
  const [course, setCourse] = useState({
    title: "",
    length: "",
    instructor: "",
    modules: [""],
  });
  const [module, setModule] = useState("");

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleModules = (e) => {
    setCourse({ ...course, modules: [...course.modules, module] });
    setModule("");
  };

  console.log(course);
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        window.location.href = "/dashboard/courses";
      }, 2000);
    }
  }, [message]);

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Register a course
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  onChange={handleChange}
                  id="title"
                  name="title"
                  placeholder="Course Title"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="length">Length</Label>
                <Input
                  onChange={handleChange}
                  id="length"
                  name="length"
                  placeholder="Course Length"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="instructor">Instructor</Label>
                <Input
                  onChange={handleChange}
                  id="instructor"
                  name="instructor"
                  placeholder="Course instructor"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="module">Modules</Label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Input
                    onChange={(e) => setModule(e.target.value)}
                    value={module}
                    id="module"
                    name="module"
                    placeholder="Course module"
                    type="text"
                  />
                  <Button onClick={handleModules}>Add</Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // height: 50,
                  }}
                >
                  {course.modules.map((module) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginRight: 10,
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Label>{module}</Label>
                      {/* <Button color="danger" size="sm" onClick={()=>}>
                        X
                      </Button> */}
                    </div>
                  ))}
                </div>
              </FormGroup>
              <Alert color="success" isOpen={message}>
                {message}
              </Alert>
              <Button onClick={() => dispatch(apis.createCourse(course))}>
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterCourse;
