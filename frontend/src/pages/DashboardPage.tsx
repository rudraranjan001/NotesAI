import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Create AI-generated study material from any topic.</p>

      <Link to="/generate">Generate Notes</Link>
      <br />
      <Link to="/notes">View Saved Notes</Link>
    </div>
  );
};

export default DashboardPage;