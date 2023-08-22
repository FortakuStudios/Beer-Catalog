import { useState, useEffect } from "react";
import { Container, Row, Col, FormControl } from "react-bootstrap";
import axios from "axios";
import BeerCard from "./Component/BeerCard";
import PaginationComponent from "./Component/Pagination";

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const beersPerPage = 8;

  useEffect(() => {
    async function fetchBeers() {
      try {
        const response = await axios.get("https://api.punkapi.com/v2/beers");
        setBeers(response.data);
      } catch (error) {
        console.error("Error fetching beers:", error);
      }
    }

    fetchBeers();
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstBeer = indexOfLastBeer - beersPerPage;
  const currentBeers = filteredBeers.slice(indexOfFirstBeer, indexOfLastBeer);
  const totalPages = Math.ceil(filteredBeers.length / beersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container className="mt-4">
        <h1 className="mb-4 text-center">Beer Catalog</h1>
        <FormControl
          type="text"
          placeholder="Search beers..."
          className="mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Row xs={1} sm={2} md={3} lg={4} xl={8} className="g-4">
          {currentBeers.map((beer) => (
            <Col key={beer.id}>
              <BeerCard beer={beer} className="pt-3" />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
