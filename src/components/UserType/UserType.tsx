import { Radio, RadioChangeEvent } from "antd";
import { FC, lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Login = lazy(() => import("../Login"));

enum EUserTypOption {
  SignUp = "signup",
  Login = "login",
  Guest = "guest",
}

const options = [
  { label: "Sign Up", value: EUserTypOption.SignUp, disabled: true },
  { label: "Login", value: EUserTypOption.Login },
  { label: "Play as guest", value: EUserTypOption.Guest, disabled: true },
];

const UserType: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppContext();

  useEffect(() => {
    if (isAuth) {
      navigate("/quiz");
    }
  }, [isAuth, navigate]);

  const [userType, setUserType] = useState<EUserTypOption>(
    EUserTypOption.Login
  );

  const handleChange = (e: RadioChangeEvent) => {
    console.log("Selected value:", e.target.value);
    setUserType(e.target.value);
  };

  return (
    <>
      <Radio.Group
        onChange={handleChange}
        value={userType}
        options={options}
        defaultValue="Apple"
        optionType="button"
        buttonStyle="solid"
        size="large"
      />

      <Suspense fallback={<div>loading...</div>}>
        {userType === EUserTypOption.Login && <Login />}
      </Suspense>
    </>
  );
};

export default UserType;
