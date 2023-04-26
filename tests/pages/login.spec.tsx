import Login from "@/pages/login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("should have 2 input fields", () => {
   render(
      <GoogleOAuthProvider clientId={"354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com"}>
         <Provider store={store}>
            <Login />
         </Provider>
      </GoogleOAuthProvider>
   );
   const emailInput: HTMLInputElement = screen.getByPlaceholderText(/enter email*/i);
   const passwordInput: HTMLInputElement = screen.getByPlaceholderText(/Enter Password/i);

   fireEvent.change(passwordInput, { target: { value: "my-password" } });
   fireEvent.change(emailInput, { target: { value: "codealgo@gmail.com" } });

   expect(passwordInput.value).toBe("my-password");
   expect(emailInput.value).toBe("codealgo@gmail.com");
});
