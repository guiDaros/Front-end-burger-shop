import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../services/api";
import { toast } from "react-toastify";

import { Button } from "../../components/Button";
import Logo from "../../assets/Logo1.svg";

import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
} from "./styles";

export function Register() {
  const navigate = useNavigate();
  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .email("Try a valid one.")
        .required("Email is required."),
      password: yup
        .string()
        .min(6, "At least 6 digits.")
        .required("Password is required."),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "The passwords didnt match")
        .required("Confirm your password"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { status } = await api.post(
        "/users",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          validateStatus: () => true,
          //axios ducumentation
        }
      );

      if (status === 200 || status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        toast.success("account created successfully!");
      } else if (status === 409) {
        toast.error("Email already registered.");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("System failure, try again.");
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="devburger-logo" />
      </LeftContainer>
      <RightContainer>
        <Title>Create account</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Name</label>
            <input type="text" {...register("name")} />
            <p>{errors?.name?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Confirm Password</label>
            <input type="password" {...register("confirmPassword")} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit">Login</Button>
        </Form>
        <p>
          Already have an account? <Link to="/login">Log in.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
