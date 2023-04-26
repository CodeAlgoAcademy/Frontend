import PrivacyPolicy from "@/pages/privacyPolicy";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("should have two buttons", () => {
   render(
      <Provider store={store}>
         <PrivacyPolicy />
      </Provider>
   );
   const buttons = screen.getAllByRole("button");
   console.log(buttons[0].textContent);
   expect(buttons[0].textContent).toBe("Accept");
   expect(buttons[1].textContent).toBe("Reject");
});
