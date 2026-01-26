import Header from "./Header";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.body}>{/* Dashboard content */}</main>
    </div>
  );
};

export default Dashboard;
