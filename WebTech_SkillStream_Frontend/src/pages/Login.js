import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { apis } from "../store/apis"; // Assuming 'apis' correctly exports your thunks
import { useEffect, useState } from "react";
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Local State Declarations ---
  const [isLoading, setLoading] = useState(false); // Used for general loading or specific cases like verification modal
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState("");
  const [pendingVerificationUser, setPendingVerificationUser] = useState(null); // Added state variable
  const [registerUser, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    age: "",
  });

  // Dedicated state for Forgot Password flow
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordOTP, setForgotPasswordOTP] = useState("");
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1 = email, 2 = OTP, 3 = new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(null);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false); // Dedicated loading state for forgot password flow

  // --- Redux State Selectors ---
  const loginState = useSelector((state) => state.login || {});
  const verifyCodeState = useSelector((state) => state.verifyCode || {});
  const registerState = useSelector((state) => state.register || {});

  const {
    loading: loginLoading = false,
    error: loginError = null,
    user = null,
    successMessage: loginSuccessMessage = ""
  } = loginState;

  const {
    loading: verifying = false,
    error: verifyError = null,
    user: verifiedUser = null,
    successMessage: verifySuccessMessage = ""
  } = verifyCodeState;

  const {
    loading: registering = false,
    user: registeredUser = null,
    message = null,
    error: registerError = null
  } = registerState;

  // --- Helper Function for Role-Based Navigation ---
  const navigateByRole = (userObj) => {
    const userRole = userObj?.role?.toLowerCase() || 'student';
    
    if (userRole === 'admin') {
      navigate("/dashboard"); // Admin goes to dashboard
    } else {
      navigate("/"); // Regular users go to home page (root path)
    }
  };

  // --- Input Change Handlers ---
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  // --- Forgot Password Handlers ---
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    // Reset all forgot password states when opening the modal
    setForgotPasswordStep(1);
    setForgotPasswordEmail("");
    setForgotPasswordOTP("");
    setNewPassword("");
    setConfirmNewPassword("");
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null);
    setForgotPasswordLoading(false); // Ensure this is false on open
  };

  const handleSendOTP = async () => {
    if (!forgotPasswordEmail) {
      setForgotPasswordError("Please enter your email address.");
      return;
    }

    setForgotPasswordLoading(true); // Use dedicated loading state
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null); // Clear previous success messages

    try {
      // Replace with your actual API call (e.g., apis.sendPasswordResetOTP)
      const response = await dispatch(apis.sendPasswordResetOTP({ email: forgotPasswordEmail }));
      console.log('sendPasswordResetOTP response:', response); // For debugging

      if (response.meta?.requestStatus === 'fulfilled') {
        setForgotPasswordStep(2);
        setForgotPasswordSuccess("OTP sent to your email. Check your inbox!");
      } else {
        // Axios error object will be in payload if rejected by Redux Thunk
        setForgotPasswordError(response.payload?.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error('Error in handleSendOTP:', error); // Log actual error
      setForgotPasswordError(error.message || "An unexpected error occurred while sending OTP.");
    } finally {
      setForgotPasswordLoading(false); // Reset dedicated loading state
    }
  };

  const handleVerifyOTP = async () => {
    if (!forgotPasswordOTP || forgotPasswordOTP.length !== 6) {
      setForgotPasswordError("Please enter a valid 6-digit OTP.");
      return;
    }

    setForgotPasswordLoading(true); // Use dedicated loading state
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null); // Clear previous success messages

    try {
      // Replace with your actual API call (e.g., apis.verifyPasswordResetOTP)
      const response = await dispatch(apis.verifyPasswordResetOTP({
        email: forgotPasswordEmail,
        code: forgotPasswordOTP
      }));
      console.log('verifyPasswordResetOTP response:', response); // For debugging

      if (response.meta?.requestStatus === 'fulfilled') {
        setForgotPasswordStep(3);
        setForgotPasswordSuccess("OTP verified. You can now create your new password.");
      } else {
        setForgotPasswordError(response.payload?.message || "Invalid OTP or it has expired.");
      }
    } catch (error) {
      console.error('Error in handleVerifyOTP:', error); // Log actual error
      setForgotPasswordError(error.message || "An unexpected error occurred during OTP verification.");
    } finally {
      setForgotPasswordLoading(false); // Reset dedicated loading state
    }
  };

  // --- THIS IS THE handleResetPassword FUNCTION YOU PROVIDED (WITH MODIFICATIONS) ---
  const handleResetPassword = async () => {
    console.log("handleResetPassword called");
    if (!newPassword || !confirmNewPassword) {
      setForgotPasswordError("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setForgotPasswordError("Passwords don't match.");
      return;
    }

    setForgotPasswordLoading(true); // Set loading true at the start
    setForgotPasswordError(null); // Clear previous errors
    setForgotPasswordSuccess(null); // Clear previous success messages

    // Log data, hide full password for security in console
    console.log("Dispatching resetPassword with:", { email: forgotPasswordEmail, code: forgotPasswordOTP, newPassword: newPassword.slice(0, 5) + '...' });
    try {
      // Replace with your actual API call (e.g., apis.resetPassword)
      const response = await dispatch(apis.resetPassword({
        email: forgotPasswordEmail,
        code: forgotPasswordOTP,
        newPassword: newPassword
      }));
      console.log("resetPassword dispatch response:", response);

      if (response.meta?.requestStatus === 'fulfilled') {
        setForgotPasswordSuccess("Password updated successfully! You can now login with your new password.");
        setTimeout(() => {
          setShowForgotPasswordModal(false);
          setForgotPasswordStep(1); // Reset step
          setForgotPasswordEmail(""); // Clear email
          setForgotPasswordOTP(""); // Clear OTP
          setNewPassword(""); // Clear new password
          setConfirmNewPassword(""); // Clear confirm password
          setForgotPasswordError(null); // Clear all messages
          setForgotPasswordSuccess(null);
          setForgotPasswordLoading(false); // Ensure loading is reset
        }, 3000); // Give user time to read success message before closing
      } else {
        // Handle rejected status (e.g., from network error, backend validation)
        setForgotPasswordError(response.payload?.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error during resetPassword dispatch:", error);
      setForgotPasswordError(error.message || "An unexpected error occurred while resetting password.");
    } finally {
      setForgotPasswordLoading(false); // Always reset loading state
    }
  };
  // --- End of handleResetPassword function ---

  // --- General Handlers ---
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(apis.login(loginData));
      console.log("Login response:", response);

      if (response.meta?.requestStatus === 'fulfilled') {
        const payload = response.payload;

        // Check if verification is required
        if (typeof payload === 'string' &&
          (payload.includes("Verification code sent") ||
            payload.includes("verification") ||
            payload.includes("code sent"))) {
          console.log("Verification required");
          setEmailForVerification(loginData.email);
          setShowVerificationModal(true);
          setLoading(false);
          // Added logic for pendingVerificationUser
          // user is from: const { loading: loginLoading = false, error: loginError = null, user = null, ... } = loginState;
          // This 'user' should be the one just returned by the apis.login() call and updated in Redux state.
          if (user && typeof user === 'object' && user.role) { // Check if user object with role exists
            setPendingVerificationUser(user);
            console.log("Stored pending user for verification:", user);
          } else {
            // This case is less ideal, means the login API didn't return full user data before verification trigger
            console.log("No full user object from loginState.user to store pending verification.");
            // Potentially store loginData.email and anticipate the verifyCode API must return full details
            setPendingVerificationUser({ email: loginData.email }); 
          }
        }
        // Direct login success
        else if (payload && typeof payload === 'object' && (payload.id || payload.email)) {
          console.log("Direct login success");
          localStorage.setItem("user", JSON.stringify(payload));
          setLoading(false);
          dispatch(apis.resetAll());
          navigateByRole(payload); // Use role-based navigation
        }
        // Success message but no user object
        else if (typeof payload === 'string') {
          console.log("Login success message:", payload);
          setLoading(false);
          // Check if user data is in the login state
          if (user && (user.id || user.email)) {
            localStorage.setItem("user", JSON.stringify(user));
            navigateByRole(user); // Use role-based navigation
          }
        }
      } else {
        console.error("Login failed:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!verificationCode || verificationCode.length !== 6) {
      alert("Please enter a valid 6-digit verification code");
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(apis.verifyCode({
        email: emailForVerification,
        code: verificationCode
      }));

      console.log("Verification response:", response);

      if (response.meta?.requestStatus === 'fulfilled') {
        const payload = response.payload;

        // User object returned
        if (payload && typeof payload === 'object' && (payload.id || payload.email)) {
          console.log("Verification returned user object", payload);
          // NEW LOGIC: Check if role is present, if not, try to merge with pendingVerificationUser
          let userToStore = payload;
          if (!payload.role && pendingVerificationUser && pendingVerificationUser.role) {
            userToStore = { ...pendingVerificationUser, ...payload, verified: true }; // Ensure verified status and other pending details are merged
            console.log("Merged with pendingVerificationUser to include role:", userToStore);
          } else if (!payload.role && !pendingVerificationUser?.role) {
             // If no role from payload and no role from pending, create a default student role or similar
             userToStore = { ...payload, role: 'student', verified: true }; // Default role
             console.warn("User role not found in verification payload or pending data. Defaulting to student.", userToStore);
          }
          
          localStorage.setItem("user", JSON.stringify(userToStore));
          setShowVerificationModal(false);
          setLoading(false);
          setVerificationCode("");
          dispatch(apis.resetAll());
          navigateByRole(userToStore); // Use role-based navigation
          setPendingVerificationUser(null); // Clear pending user
        }
        // Success message
        else if (typeof payload === 'string' &&
          (payload.includes("verified") || payload.includes("success"))) {
          console.log("Verification success message");
          // The useEffect will handle the navigation
          setLoading(false);
        }
      } else {
        console.error("Verification failed:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setLoading(false);
    }
  };

  const closeVerificationModal = () => {
    setShowVerificationModal(false);
    setLoading(false);
    setVerificationCode("");
    setEmailForVerification("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate registration data
    if (!registerUser.name || !registerUser.email || !registerUser.password || !registerUser.age) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(apis.register({ ...registerUser, role: "student" }));
  };

  // --- useEffect Hooks ---
  // Effect for verification success (without explicit user object)
  useEffect(() => {
    if (verifySuccessMessage && !verifyError && !verifiedUser) {
      console.log("Verification success message received in useEffect:", verifySuccessMessage);

      let userToStore = {
        email: emailForVerification, // Email used for verification
        verified: true // Mark as verified
      };

      // Prioritize pendingVerificationUser for role and other details
      if (pendingVerificationUser && typeof pendingVerificationUser === 'object') {
        userToStore = { ...pendingVerificationUser, ...userToStore }; 
        console.log("Constructed userToStore in useEffect using pendingVerificationUser:", userToStore);
      } 
      // Fallback: if verifyCodeState.user (verifiedUser) somehow got populated by the API with a role
      else if (verifiedUser && typeof verifiedUser === 'object' && verifiedUser.role) {
        userToStore = { ...verifiedUser, ...userToStore };
        console.log("Constructed userToStore in useEffect using verifiedUser from Redux state:", userToStore);
      }
      // Fallback: if loginState.user (user) still has data (less reliable at this stage)
      else if (user && typeof user === 'object' && user.role) { 
        userToStore = { ...user, ...userToStore };
        console.log("Constructed userToStore in useEffect using user from loginState:", userToStore);
      }

      // If no role could be found from any source, assign a default role (e.g., 'student')
      if (!userToStore.role) {
        userToStore.role = 'student';
        console.warn("User role could not be determined in useEffect. Defaulting to 'student'.", userToStore);
      }
      
      // Ensure token is preserved if it was part of pendingVerificationUser or other sources
      if (pendingVerificationUser && pendingVerificationUser.token && !userToStore.token) {
        userToStore.token = pendingVerificationUser.token;
      } else if (verifiedUser && verifiedUser.token && !userToStore.token) {
         userToStore.token = verifiedUser.token;
      } else if (user && user.token && !userToStore.token) {
         userToStore.token = user.token;
      }


      localStorage.setItem("user", JSON.stringify(userToStore));
      setShowVerificationModal(false);
      setLoading(false);
      setVerificationCode("");
      setPendingVerificationUser(null); // Clear pending user

      setTimeout(() => {
        dispatch(apis.resetAll());
        navigateByRole(userToStore); // Use role-based navigation
      }, 500);
    }
  }, [verifySuccessMessage, verifyError, verifiedUser, emailForVerification, user, navigate, dispatch, pendingVerificationUser]); // Added pendingVerificationUser to dependency array

  // Effect to auto-clear general errors (login, register, verify code)
  useEffect(() => {
    if (loginError || registerError || verifyError) {
      const timer = setTimeout(() => {
        dispatch(apis.resetAll()); // This clears all errors in the combined reducer
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginError, registerError, verifyError, dispatch]);

  // Effect to auto-clear forgot password specific errors/success messages
  useEffect(() => {
    if (forgotPasswordError || forgotPasswordSuccess) {
      const timer = setTimeout(() => {
        setForgotPasswordError(null);
        // Only clear success if not waiting for redirect after step 3 success
        if (forgotPasswordSuccess && forgotPasswordStep !== 3) {
          setForgotPasswordSuccess(null);
        }
      }, 7000); // Longer duration for messages
      return () => clearTimeout(timer);
    }
  }, [forgotPasswordError, forgotPasswordSuccess, forgotPasswordStep]);

  // --- JSX Render ---
  return (
    <div className="containerAll">
      {/* Verification Code Modal */}
      <Modal isOpen={showVerificationModal} toggle={closeVerificationModal}>
        <ModalHeader toggle={closeVerificationModal}>Enter Verification Code</ModalHeader>
        <form onSubmit={handleVerifyCode}>
          <ModalBody>
            <p>We've sent a 6-digit verification code to <strong>{emailForVerification}</strong>. Please enter it below:</p>
            <FormGroup>
              <Label for="verificationCode">Verification Code</Label>
              <Input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength="6"
                required
                autoFocus
              />
            </FormGroup>
            {verifyError && (
              <Alert color="danger" className="mt-3">
                {typeof verifyError === 'string' ? verifyError :
                  (verifyError.message || verifyError.error || "Invalid verification code")}
              </Alert>
            )}
            {verifySuccessMessage && (
              <Alert color="success" className="mt-3">
                {verifySuccessMessage}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              disabled={isLoading || verifying || !verificationCode || verificationCode.length !== 6}
            >
              {(isLoading || verifying) ? "Verifying..." : "Verify"}
            </Button>
            <Button color="secondary" onClick={closeVerificationModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal isOpen={showForgotPasswordModal} toggle={() => {
        setShowForgotPasswordModal(false);
        setForgotPasswordStep(1);
        setForgotPasswordError(null);
        setForgotPasswordSuccess(null);
        setForgotPasswordLoading(false); // Reset on close
      }}>
        <ModalHeader toggle={() => {
          setShowForgotPasswordModal(false);
          setForgotPasswordStep(1);
          setForgotPasswordError(null);
          setForgotPasswordSuccess(null);
          setForgotPasswordLoading(false); // Reset on close
        }}>
          {forgotPasswordStep === 1 ? "Reset Password" :
            forgotPasswordStep === 2 ? "Verify OTP" : "Create New Password"}
        </ModalHeader>
        <ModalBody>
          {forgotPasswordStep === 1 && (
            <div>
              <p>Enter your email address to receive a password reset OTP.</p>
              <FormGroup>
                <Label for="forgotPasswordEmail">Email Address</Label>
                <Input
                  type="email"
                  id="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  required
                  autoFocus
                />
              </FormGroup>
            </div>
          )}

          {forgotPasswordStep === 2 && (
            <div>
              <p>We've sent a 6-digit OTP to <strong>{forgotPasswordEmail}</strong>. Please enter it below:</p>
              <FormGroup>
                <Label for="forgotPasswordOTP">OTP Code</Label>
                <Input
                  type="text"
                  id="forgotPasswordOTP"
                  value={forgotPasswordOTP}
                  onChange={(e) => setForgotPasswordOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  required
                  autoFocus
                />
              </FormGroup>
            </div>
          )}

          {forgotPasswordStep === 3 && (
            <div>
              <p>Create your new password for <strong>{forgotPasswordEmail}</strong>.</p>
              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength="6"
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmNewPassword">Confirm New Password</Label>
                <Input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  minLength="6"
                />
              </FormGroup>
            </div>
          )}

          {forgotPasswordError && (
            <Alert color="danger" className="mt-3">
              {forgotPasswordError}
            </Alert>
          )}

          {forgotPasswordSuccess && (
            <Alert color="success" className="mt-3">
              {forgotPasswordSuccess}
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          {forgotPasswordStep === 1 && (
            <Button
              color="primary"
              onClick={handleSendOTP}
              disabled={forgotPasswordLoading || !forgotPasswordEmail}
            >
              {forgotPasswordLoading ? "Sending..." : "Send OTP"}
            </Button>
          )}

          {forgotPasswordStep === 2 && (
            <Button
              color="primary"
              onClick={handleVerifyOTP}
              disabled={forgotPasswordLoading || !forgotPasswordOTP || forgotPasswordOTP.length !== 6}
            >
              {forgotPasswordLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          )}

          {forgotPasswordStep === 3 && (
            <Button
              color="primary"
              onClick={handleResetPassword}
              disabled={forgotPasswordLoading || !newPassword || !confirmNewPassword || newPassword !== confirmNewPassword}
            >
              {forgotPasswordLoading ? "Updating..." : "Update Password"}
            </Button>
          )}

          <Button
            color="secondary"
            onClick={() => {
              setShowForgotPasswordModal(false);
              setForgotPasswordStep(1);
              setForgotPasswordError(null);
              setForgotPasswordSuccess(null);
              setForgotPasswordLoading(false); // Reset on cancel
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Main Login/Signup UI */}
      <div className="container1">
        <input type="checkbox" id="flip" />
        <div className="cover1">
          <div className="front1">
            <img
              className="frontImg1"
              src="https://www.alueducation.com/wp-content/uploads/2019/10/ALU-Tutoo-team.png"
              alt=""
            />
            <div className="text1">
              <span className="text-1">
                Every new friend is a <br /> new adventure
              </span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back1">
            <img
              className="backImg1"
              src="https://img.freepik.com/premium-photo/smiling-african-american-man-sitting-desk-working-laptop-taking-notes-notebook-black-male-studying-online_116547-26697.jpg?w=2000"
              alt=""
            />
            <div className="text1">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms1">
          <div className="form-content1">
            {/* Login Form */}
            <div className="login-form1">
              <div className="title1">Login</div>
              <form onSubmit={handleLogin}>
                <div className="input-boxes1">
                  <div className="input-box1">
                    <i className="fas fa-envelope"></i>
                    <input
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      required
                    />
                  </div>
                  <div className="input-box1">
                    <i className="fas fa-lock"></i>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      required
                    />
                  </div>
                  <div className="text1">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPasswordClick(); }}>Forgot password?</a>
                  </div>
                  <div className="button1 input-box1">
                    <input
                      type="submit"
                      value={loginLoading || isLoading ? "Loading..." : "Login"}
                      disabled={loginLoading || isLoading}
                    />
                  </div>
                  {loginError && (
                    <Alert color="danger" isOpen={!!loginError}>
                      {typeof loginError === 'string' ? loginError :
                        (loginError.message || loginError.error || "Login failed")}
                    </Alert>
                  )}
                  {loginSuccessMessage && !showVerificationModal && (
                    <Alert color="success" isOpen={!!loginSuccessMessage}>
                      {loginSuccessMessage}
                    </Alert>
                  )}
                  <div className="text1 sign-up-text1">
                    Don't have an account? <label htmlFor="flip">Signup now</label>
                  </div>
                </div>
              </form>
            </div>

            {/* Signup Form */}
            <div className="signup-form1">
              <div className="title1">Signup</div>
              <form onSubmit={handleRegister}>
                <div className="input-boxes1">
                  <div className="input-box1">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={registerUser.name}
                      required
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="input-box1">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={registerUser.email}
                      required
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="input-box1">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={registerUser.password}
                      required
                      onChange={handleRegisterChange}
                      minLength="6"
                    />
                  </div>
                  <div className="input-box1">
                    <i className="fas fa-calendar"></i>
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter your age"
                      value={registerUser.age}
                      required
                      onChange={handleRegisterChange}
                      min="13"
                      max="120"
                    />
                  </div>
                  <div className="button1 input-box1">
                    <input
                      type="submit"
                      value={registering ? "Registering..." : "Submit"}
                      disabled={registering}
                    />
                  </div>
                  {registerError && (
                    <Alert color="danger" isOpen={!!registerError}>
                      {typeof registerError === 'string' ? registerError :
                        (registerError.message || registerError.error || "Registration failed")}
                    </Alert>
                  )}
                  {message && (
                    <Alert color="success" isOpen={!!message}>
                      {message}
                    </Alert>
                  )}
                  <div className="text1 sign-up-text1">
                    Already have an account?{" "}
                    <label htmlFor="flip">Login now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};