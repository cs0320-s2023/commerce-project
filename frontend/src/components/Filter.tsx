import { Platforms } from "./Platforms";
import {Row, Col, Container} from "react-bootstrap"
import "../App.css"

export const Filter = () => {

    return (
      <div className="filter-container" role="filter-container">
        <Container>
          <Row>
            <div className="filter" role="filter">
              <Col>
                <Platforms />
              </Col>
              {/* <Col>
                <Currency />
              </Col> 
              <Col>
                <Size />
              </Col>*/}
            </div>
          </Row>
        </Container>
      </div>
    );

};

