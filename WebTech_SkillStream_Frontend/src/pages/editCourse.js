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
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";

const EditCourse = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, message } = useSelector((state) => state.createCourse);
  const { course } = useSelector((state) => state.getCourse);
  const [updatedCourse, setUpdatedCourse] = useState({
    title: course.title,
    length: course.length,
    instructor: course.instructor,
    modules: course.modules,
  });
  const [module, setModule] = useState("");

  const handleChange = (e) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleModules = (e) => {
    setUpdatedCourse({
      ...updatedCourse,
      modules: [...course.modules, module],
    });
    setModule("");
  };

  console.log(course);
  useEffect(() => {
    dispatch(apis.getcourse(id));
  }, [dispatch]);

  useEffect(() => {
    setUpdatedCourse({
      title: course.title,
      length: course.length,
      instructor: course.instructor,
      modules: course.modules,
      id: course.id,
    });
  }, [course]);

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
            Edit course [{course.title}]
          </CardTitle>
          {loading ? (
            <Loader />
          ) : (
            course && (
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      onChange={handleChange}
                      value={updatedCourse.title}
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
                      value={updatedCourse.length}
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
                      value={updatedCourse.instructor}
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
                      {course.modules &&
                        course.modules.length > 0 &&
                        updatedCourse.modules &&
                        updatedCourse.modules.length > 0 &&
                        updatedCourse.modules.map((module) => (
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
                          </div>
                        ))}
                    </div>
                  </FormGroup>
                  <Alert color="success" isOpen={message}>
                    {message}
                  </Alert>
                  <Button
                    onClick={() => dispatch(apis.updateCourse(updatedCourse))}
                  >
                    {loading ? "Loading..." : "Update"}
                  </Button>
                </Form>
              </CardBody>
            )
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default EditCourse;
