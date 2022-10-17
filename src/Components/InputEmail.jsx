import { useAuth } from "../Contexts/AuthContext";

export const InputEmail = () => {
  const { handleChange } = useAuth();
  return (
    <div className="auth__form-container_fields-content_input">
      <label htmlFor="email">E-Mail</label>
      <input name="email" type="text" onChange={handleChange} required />
    </div>
  );
};
