import { useState, useRef } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import styles from "./Signup.module.css";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const imageInputRef = useRef(null);
  const imagePreviewRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    showPassword: false,
  });

  const { createUser } = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const file = imageInputRef.current.files[0];

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("dob", form.dob);
      formData.append("image", file);

      await createUser(formData);

    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      imagePreviewRef.current.src = reader.result;
      imagePreviewRef.current.classList.add(styles.showImage);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div
          className={styles.avatarWrapper}
          onClick={() => imageInputRef.current.click()}
        >
          <img ref={imagePreviewRef} className={styles.avatar} />
          <Upload className={styles.uploadIcon} />
        </div>

        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />

        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
