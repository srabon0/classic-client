import { Button, Row, Col, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Form from "../components/form/Form";
const { Title } = Typography;
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";
import FormInput from "../components/form/FormInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: "srabonemam4@gmail.com",
    password: "password123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/dashboard`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", background: "#f0f2f5" }}
      >
        <Col
          xs={22}
          sm={16}
          md={12}
          lg={8}
          xl={6}
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Sign In
          </Title>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <FormInput name="email" type="text" label="Email" required />
            <FormInput
              name="password"
              type="password"
              label="Password"
              required
            />
            <Button
              style={{ width: "100%", marginTop: "10px" }}
              htmlType="submit"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
