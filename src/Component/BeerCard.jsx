import { Card } from "react-bootstrap";

const BeerCard = ({ beer }) => {
  return (
    <Card className="h-100 shadow-sm">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <Card.Img
          variant="top"
          src={beer.image_url}
          alt={beer.name}
          className="pt-3"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>
      <Card.Body>
        <Card.Title className="text-center">{beer.name}</Card.Title>
        <Card.Text className="text-muted text-center">{beer.tagline}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BeerCard;
