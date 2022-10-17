import { useAuth } from "../Contexts/AuthContext";

export const InputUsername = () => {
  const { handleChange } = useAuth();
  return (
    <div className="auth__form-container_fields-content_input">
      <label htmlFor="username">
        Username <span className="required">*</span>
      </label>
      <input name="username" type="text" onChange={handleChange} required />
    </div>
  );
};
