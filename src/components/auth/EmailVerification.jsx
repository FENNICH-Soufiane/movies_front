import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../../api/auth";
import { useNotification } from "../../hooks";


const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
  let valid = false
  for(let val of otp) {
    valid = !isNaN(parseInt(val));
    if(!valid) break;
  }
  return valid
}

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  const {state} = useLocation();
  const user = state?.user;
  console.log(state);

  const navigate = useNavigate();
  

  const focusNextInputField = (index) => {
    if (index < OTP_LENGTH - 1) {
      setActiveOtpIndex(index + 1);
    }
  };

  const focusPrevInputField = (index) => {
    if (index > 0) {
      setActiveOtpIndex(index - 1);
    }
  };

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[activeOtpIndex] = value.slice(-1); // Garde seulement le dernier caractère (assurant un seul chiffre)

    setOtp(newOtp);

    if (value) {
      focusNextInputField(activeOtpIndex);
    }
  };

  const handleKeyDown = ({ key }, index) => {
    console.log(key)
    if (key === "Backspace" && !otp[index]) {
      focusPrevInputField(index);
    } else if (key === "ArrowRight") {
      focusNextInputField(index);
    } else if (key === "ArrowLeft") {
      focusPrevInputField(index);
    }
  };

  const { updateNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isValidOTP(otp)) return updateNotification('error', 'invalid OTP');
    console.log(otp);
    const {error, message} = await verifyUserEmail({OTP: otp.join(""), userId: user?.id});
    if(error) {
      console.log(error);
      return updateNotification("error", error);
    }
    console.log(message);
    updateNotification("success", message)
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  // useEffect(() => {
  //   if (!user) navigate("/not-found");
  // }, [user]);
  
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index] || ""}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle  border-light-subtle darK:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>

          <Submit value="Verify Account" />
        </form>
      </Container>
    </FormContainer>
  );
}
