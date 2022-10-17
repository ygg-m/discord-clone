import { useAuth } from "../Contexts/AuthContext";

export const InputPasswordConfirm = () => {
  const { handleChange } = useAuth();
  return (
    <div className="auth__form-container_fields-content_input">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        required
      />
    </div>
  );
};
