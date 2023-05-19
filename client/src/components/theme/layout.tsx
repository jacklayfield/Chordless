import { Row, Col } from "react-bootstrap";
import { useViewport } from "../../hooks/useViewport";

interface PPROPS {
  children: React.ReactNode | React.ReactNode[];
  name: String;
}

export const Layout: React.FC<PPROPS> = ({ children, name }) => {
  const { width } = useViewport();
  const breakpoint_mid_window = 1440;
  const breakpoint_small_window = 1160;
  const breakpoint_mobile = 957;

  return (
    <div>
      <Row className="gx-0">
        <Col />
        <Col
          xs={
            width > breakpoint_mid_window
              ? 8
              : width > breakpoint_small_window
              ? 10
              : 12
          }
        >
          <div className="columns">
            <div className="section-titles">
              <header className="section-titles-text">{name}</header>
            </div>

            {children}
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};
