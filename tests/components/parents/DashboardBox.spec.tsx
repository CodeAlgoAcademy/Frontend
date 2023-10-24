import DashboardBox from "@/components/parents/DashboardBox";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("Should render correctly", () => {
   render(
      <Provider store={store}>
         <DashboardBox title="Test Title" padding="large">
            <form data-testid="test-child"></form>
         </DashboardBox>
      </Provider>
   );

   //    Expect element with that test id to be in the document
   const titleEl = screen.getByTestId("Test Title");

   // Expect it to render the child correctly
   const child = screen.getByTestId("test-child");

   expect(titleEl).toBeInTheDocument();
   expect(titleEl.textContent).toBe("Test Title");
   expect(child).toBeInTheDocument();
});
