import { useAuth } from "../Contexts/AuthContext";

export const InputAvatarURL = () => {
  const { handleChange } = useAuth();
  return (
    <div className="auth__form-container_fields-content_input">
      <label htmlFor="avatarURL">Avatar URL</label>
      <input name="avatarURL" type="text" onChange={handleChange} required />
    </div>
  );
};
