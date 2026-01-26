import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Login.module.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // intentionally empty
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <div className={styles.passwordWrapper}>
          <input
            type={form.showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <span
            onClick={() =>
              setForm({ ...form, showPassword: !form.showPassword })
            }
          >
            {form.showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
