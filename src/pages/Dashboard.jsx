import Heading from "../ui/Heading";
import { getUser } from "../services/apiLogin";
import Row from "../ui/Row";

function Dashboard() {
  getUser();
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Dashboard;
