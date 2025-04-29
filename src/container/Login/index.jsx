// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { api } from "../../services/api";
// import {toast} from 'react-toastify'

// import { Button } from "../../components/Button";
// import Logo from "../../assets/Logo1.svg";

// import {
//   Container,
//   Form,
//   InputContainer,
//   LeftContainer,
//   RightContainer,
//   Title,
// } from "./styles";

// export function Login() {
//   const schema = yup
//     .object({
//       email: yup
//         .string()
//         .email("Try a valid one.")
//         .required("Email is required."),
//       password: yup
//         .string()
//         .min(6, "At least 6 digits.")
//         .required("Password is required."),
//     })
//     .required();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     const response = await toast.promise(
//       api.post("/sessions", {
//         email: data.email,
//         password: data.password,
//       },
//     { headers: {
//       'Authorization': 'Bearer ${token}'
//     }},
//     ),
//       {
//         pending: 'Verifying data',
//         success:'Wellcome!',
//         error:'Incorrect Information.',
//       },

//     )

//     console.log(response);
//   };

//   return (
//     <Container>
//       <LeftContainer>
//         <img src={Logo} alt="devburger-logo" />
//       </LeftContainer>
//       <RightContainer>
//         <Title>
//           Hello, Welcome to <span>Dev Burger</span>
//           <br />
//           Access with your <span>Login.</span>
//         </Title>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <InputContainer>
//             <label>Email</label>
//             <input type="email" {...register("email")} />
//             <p>{errors?.email?.message}</p>
//           </InputContainer>
//           <InputContainer>
//             <label>Password</label>
//             <input type="password" {...register("password")} />
//             <p>{errors?.password?.message}</p>
//           </InputContainer>
//           <Button type="submit">Login</Button>
//         </Form>
//         <p>
//           Dont have an account? <a>Sign Up.</a>
//         </p>
//       </RightContainer>
//     </Container>
//   );
// }

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/userContext";

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

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup
        .string()
        .email("Try a valid one.")
        .required("Email is required."),
      password: yup
        .string()
        .min(6, "At least 6 digits.")
        .required("Password is required."),
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
    const { data: userData } = await toast.promise(
      api.post(
        "/session",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            // Se não precisar de um token, remova esta linha
            // 'Authorization': `Bearer ${token}` // Certifique-se de que 'token' esteja definido
          },
        }
      ),
      {
        pending: "Verifying data",
        success: {
          render() {
            setTimeout(() => {
              navigate("/");
            }, 2000);
            return "Welcome!";
          },
        },
        error: "Incorrect Information.",
      }
    );

    putUserData(userData)
    // localStorage.setItem('token', token)
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="devburger-logo" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Hello, Welcome to <span>Dev Burger</span>
          <br />
          Access with your <span>Login.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit">Login</Button>
        </Form>
        <p>
          Dont have an account? <Link to="/register">Sign Up.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
