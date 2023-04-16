import SignUp from "@/pages/signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("should have a go to login button", () => {
   render(
      <GoogleOAuthProvider clientId={"354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com"}>
         <Provider store={store}>
            <SignUp />
         </Provider>
      </GoogleOAuthProvider>
   );
   const linkElement = screen.getByTestId(/sign-in/i);
   expect(linkElement).toBeInTheDocument();
});

it("should have a terms and conditions button", () => {
   render(
      <GoogleOAuthProvider clientId={"354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com"}>
         <Provider store={store}>
            <SignUp />
         </Provider>
      </GoogleOAuthProvider>
   );
   const checkbox = screen.getByRole("checkbox");
   expect(checkbox).toBeInTheDocument();
});
