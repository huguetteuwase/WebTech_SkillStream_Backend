import { Col, Row, Button } from "reactstrap";
import CustomTable from "../components/customTable";
import { Link } from "react-router-dom";

const tableHeaders = [
  {
    key: 1,
    header: "Course title",
  },
  {
    key: 2,
    header: "Course price",
  },
  {
    key: 3,
    header: "Instructor",
  },
  {
    key: 4,
    header: "Actions",
  },
];

const EnrollmentsList = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <CustomTable
            tableData={[{ title: "React", price: 1000, instructor: "John" }]}
            action="enrollments"
            tableHeaders={tableHeaders}
          />
        </Col>
        {/* <Col lg="12">
          <Button color="primary" className="mt-3">
            <Link
              className="text-decoration-none text-light"
              to="/federations/registerFederation"
            >
              Add course
            </Link>
          </Button>
        </Col> */}
      </Row>
    </div>
  );
};

export default EnrollmentsList;
