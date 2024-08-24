import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { useTheme } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";

export default function Signin() {

  // const theme = useTheme();
  // console.log(theme);
  // theme.method();
  
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72 "}>
          <Title>Sign in</Title>
          <FormInput label="Email" placeholder="john@email.com" name="email" />
          <FormInput label="Password" placeholder="********" name="password" />
          <Submit value="Sign in" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}