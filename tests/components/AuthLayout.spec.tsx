import AuthLayout from "@/components/parents/AuthLayout";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";

test("expect logo to route to homepage", () => {
   render(
      <Provider store={store}>
         <AuthLayout>
            <form data-testid="test-form"></form>
         </AuthLayout>
      </Provider>
   );

   const logo = screen.getByTestId("logo");
   fireEvent.click(logo);
   expect(window.location.pathname).toBe("/");

   //    Expect to render the children props
   const testChild = screen.getByTestId("test-form");
   expect(testChild).toBeInTheDocument();
});
