// components
import {
  InputAvatarURL,
  InputBirthdate,
  InputEmail,
  InputPassword,
  InputPasswordConfirm,
  InputUsername,
} from "../../Components/index";
// context
import { useAuth } from "../../Contexts/AuthContext";

export const Auth = () => {
  const { handleSubmit, switchMode, isSignup } = useAuth();

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <div className="auth__form-container__header">
            <h1>{isSignup ? "Create an Account" : "Welcome back!"}</h1>
            {isSignup ? null : <p>We're happy to see you again!</p>}
          </div>
          <form onSubmit={handleSubmit}>
            {isSignup && <InputEmail />}
            <InputUsername />
            {isSignup && <InputAvatarURL />}
            <InputPassword />
            {isSignup && <InputPasswordConfirm />}
            {isSignup && <InputBirthdate />}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? null : "Don't have an account?"}
              <span className="link" onClick={switchMode}>
                {isSignup ? "Already have an account?" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__background__wrapper"></div>
    </div>
  );
};
