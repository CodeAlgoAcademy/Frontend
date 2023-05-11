import Dashboard from "@/pages/parents";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("Should have 4 containers", () => {
   render(
      <Provider store={store}>
         <Dashboard />
      </Provider>
   );

   // Get each container text
   const container1 = screen.getByText("Level");
   const container2 = screen.getByText("Skills");
   const container3 = screen.getByText("Screen Time");
   const container4 = screen.getByText("Multiplayer");

   expect(container1).toBeInTheDocument();
   expect(container2).toBeInTheDocument();
   expect(container3).toBeInTheDocument();
   expect(container4).toBeInTheDocument();
});
