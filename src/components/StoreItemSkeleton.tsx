import { Card, Placeholder } from "react-bootstrap";

const StoreItemSkeleton = () => {
  return (
    <Card className="h-100">
      <div
        style={{
          height: "200px",
          marginTop: "3rem",
          backgroundColor: "#e9ecef",
          borderRadius: "4px",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-baseline my-4">
          <Placeholder as="div" animation="glow" className="w-100">
            <Placeholder xs={7} />
          </Placeholder>
          <Placeholder as="div" animation="glow" style={{ width: "80px" }}>
            <Placeholder xs={12} />
          </Placeholder>
        </div>

        <div className="mt-auto" style={{ minHeight: "80px" }}>
          <Placeholder.Button variant="primary" xs={12} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItemSkeleton;