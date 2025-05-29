import {
  Card,
  CardBody,
  CardTitle,
  Table,
  ButtonGroup,
  Button,
} from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const CustomTable = ({ tableData, tableHeaders }) => {
  const [dropdownOpen, setDropdownOpen] = useState([]);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Users</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                {tableHeaders.map((item, index) => {
                  return <th key={index}>{item.header}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((tdata, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <h6>{index + 1}</h6>
                        </div>
                      </td>
                      <td>{tdata.names}</td>
                      <td>{tdata.role}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={{
                              pathname: `/dashboard/editUser/${index + 1}`,
                              state: { user: tdata },
                            }}
                          >
                            <Button color="success" size="sm">
                              <i className="bi bi-pencil-fill"></i>
                            </Button>
                          </Link>
                          <Button
                            // onClick={() => handleDelete(tdata.id)}
                            color="danger"
                            size="sm"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default CustomTable;
