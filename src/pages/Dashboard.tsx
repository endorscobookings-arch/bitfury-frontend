import ProfileCard from "../components/ProfileCard";
import Notifications from "../components/Notifications";
import QuickActions from "../components/QuickActions";
import InvestmentCard from "../components/InvestmentCard";
import RecentTransactions from "../components/RecentTransactions";
import PortfolioChart from "../components/PortfolioChart";
import { useEffect, useState } from "react";
import "../components/Dashboard.css";
import WelcomeCard from "../components/WelcomeCard";
import StatCard from "../components/StatCard";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { API_BASE_URL } from "../config";

interface DashboardData {
  name: string;
  email: string;
  role: string;
  portfolio: number;
  balance: number;
  investments: number;
  profit: number;
  risk_level: string;
  photo: string;
}

interface DashboardResponse {
  success: boolean;
  message?: string;
  user?: {
    name: string;
    email: string;
    portfolio: number;
    balance: number;
    total_profit: number;
    profile_image: string;
  };
  summary?: {
    active_investments: number;
  };
}

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result: DashboardResponse) => {
        if (!result.success || !result.user) {
          setError(result.message ?? "Unable to load dashboard.");
          return;
        }

        setData({
          name: result.user.name,
          email: result.user.email,
          role: "Investor",
          portfolio: result.user.portfolio,
          balance: result.user.balance,
          investments: result.summary?.active_investments ?? 0,
          profit: result.user.total_profit,
          risk_level: "Moderate",
          photo: result.user.profile_image,
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Backend connection failed.");
      });
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!data) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard content">
        <Topbar name={data.name} photo={data.photo} />

        <WelcomeCard name={data.name} />

        <div className="stats-grid">
          <StatCard
            title="Portfolio Value"
            value={`$${data.portfolio.toLocaleString()}`}
          />

          <StatCard
            title="Available Balance"
            value={`$${data.balance.toLocaleString()}`}
          />

          <StatCard
            title="Active Investments"
            value={data.investments.toString()}
          />

          <StatCard
            title="Today's Profit"
            value={`+$${data.profit.toLocaleString()}`}
          />
        </div>

        <PortfolioChart portfolio={data.portfolio} />
        <RecentTransactions />

        <h2 style={{ color: "#F2C94C", marginTop: "40px" }}>
          Active Investments
        </h2>

        <InvestmentCard
          title="Real Estate"
          amount="$10,000"
          roi="12.4%"
          status="Running"
        />

        <InvestmentCard
          title="Agriculture"
          amount="$6,500"
          roi="8.2%"
          status="Running"
        />

        <InvestmentCard
          title="Cryptocurrency"
          amount="$4,200"
          roi="15.8%"
          status="Running"
        />

        <InvestmentCard
          title="Stocks"
          amount="$3,100"
          roi="7.4%"
          status="Running"
        />

        <QuickActions />
        <Notifications />
        <ProfileCard
          name={data.name}
          email={data.email}
          role={data.role}
          photo={data.photo}
        />
      </main>
    </div>
  );
}

export default Dashboard;
