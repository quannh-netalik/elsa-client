import { FC, useCallback, useState } from "react";
import { Button, Input, Typography } from "antd";
import { socket } from "../../utils/socket";
import { ESocketEvent } from "../../type";

const Login: FC = () => {
  const [username, setUsername] = useState<string>("abc");
  const [password] = useState<string>("abc");

  const handleLogin = useCallback(() => {
    socket.emit(ESocketEvent.LOGIN, {
      username,
      password,
    });
  }, [password, username]);

  return (
    <>
      <Typography.Title level={2}>Login</Typography.Title>

      <div
        style={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          size="large"
          width={100}
        />
        <Input.Password
          value={password}
          placeholder="Password"
          size="large"
          width={100}
        />

        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
