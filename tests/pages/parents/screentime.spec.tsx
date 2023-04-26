import ScreenTime from "@/pages/parents/screen-time";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("Should render two containers", () => {
   render(
      <Provider store={store}>
         <ScreenTime />
      </Provider>
   );

   const container1 = screen.getByText("Screen time");
   const container2 = screen.getByText("Current screen time restrictions");

   expect(container1).toBeInTheDocument();
   expect(container2).toBeInTheDocument();
});
