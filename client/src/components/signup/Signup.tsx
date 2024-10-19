import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import Label from "../ui/label/Label";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import axios from "axios";
import { ISignUpFormData } from "../../interfaces/forms";

const API_URL = import.meta.env.VITE_SIGNUP_API_URL;


const SignUpForm: React.FC = () => {

  const [formData, setFormData] = useState<ISignUpFormData>({
    fullName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInputFullnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      fullName: value,
    }));
  };

  const handleInputEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const handleInputPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
  };

  const handleInputConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      cpassword: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);

    try {
      const res = await axios.post(API_URL, formData);

      if (res.status == 202) {
        console.log("Sign Up successfull");
      } else {
        console.log("error occured");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      action="#"
      method="POST"
      className="space-y-4"
      onSubmit={handleFormSubmit}
    >
      <div>
        <Label htmlfor="fullname" content="Full Name" />
        <div className="mt-2">
          <Input
            id="fullname"
            name="name"
            type={"text"}
            required={true}
            onChange={handleInputFullnameChange}
          />
        </div>
      </div>

      <div>
        <Label htmlfor="email" content="Email address" />
        <div className="mt-2">
          <Input
            id="email"
            name="email"
            type={"email"}
            required={true}
            onChange={handleInputEmailChange}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlfor="password" content="password" />
        </div>
        <div className="mt-2">
          <Input
            id="password"
            name="password"
            type={"password"}
            required={true}
            onChange={handleInputPasswordChange}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlfor="cpassword" content="Confirm Password" />
        </div>
        <div className="mt-2">
          <Input
            id="cpassword"
            name="cpassword"
            type={"text"}
            required={true}
            onChange={handleInputConfirmPasswordChange}
          />
        </div>
      </div>

      <div>
        <Button type={"submit"} content="Sign Up" />
      </div>
    </form>
  );
};

const SignUp: React.FC = () => {
  return (
    <>
      <div className="h-screen w-screen bg-white">
        <div className="h-full">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <SignUpForm />
              <p className="mt-3 text-center text-sm text-gray-500">
                Already a member?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
