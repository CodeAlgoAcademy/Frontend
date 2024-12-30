import Button from "@/components/Button";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";

test("expect to display the background color passed as props", () => {
   render(
      <Provider store={store}>
         <Button color="rgb(0, 0, 0)" text="Test Button" />
      </Provider>
   );

   const button = screen.getByRole("button");

   expect(button.style.backgroundColor).toBe("rgb(0, 0, 0)");
   expect(button.textContent).toBe("Test Button");
});
