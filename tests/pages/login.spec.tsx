import Login from "@/pages/login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";

// it("should have a go to sign up button", () => {
//    render(
//       <GoogleOAuthProvider clientId={"354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com"}>
//          <Provider store={store}>
//             <Login />
//          </Provider>
//       </GoogleOAuthProvider>
//    );
//    const linkElement = screen.getByTestId("go-to-signup");
//    expect(linkElement.textContent).toBe(/create an account/i);
// });

it("should have ta form element", () => {
   render(
      <GoogleOAuthProvider clientId={"354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com"}>
         <Provider store={store}>
            <Login />
         </Provider>
      </GoogleOAuthProvider>
   );
   // const formElement = screen.getAllByRole("form");
   // expect(formElement).toBeInTheDocument();
});

it("should have a input fields", () => {
   render(
      <GoogleOAuthProvider clientId={"354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com"}>
         <Provider store={store}>
            <Login />
         </Provider>
      </GoogleOAuthProvider>
   );
   const inputElement: HTMLInputElement = screen.getByPlaceholderText(/enter email*/i);
   fireEvent.change(inputElement, { target: { value: "codealgo@gmail.com" } });
   expect(inputElement.value).toBe("codealgo@gmail.com");
});
