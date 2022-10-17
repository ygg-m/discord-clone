import { useAuth } from "../Contexts/AuthContext";

export const InputPassword = () => {
  const { handleChange } = useAuth();
  return (
    <div className="auth__form-container_fields-content_input">
      <label htmlFor="password">Password</label>
      <input name="password" type="password" onChange={handleChange} required />
    </div>
  );
};
