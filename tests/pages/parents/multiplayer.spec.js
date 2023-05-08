import Multiplayer from "@/pages/parents/multiplayer";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("Should render 4 containers", () => {
   render(
      <Provider store={store}>
         <Multiplayer />
      </Provider>
   );

   const container1 = screen.getByText("Multiplayer");
   const container2 = screen.getByText("Friends");
   const container3 = screen.getByText("Friend Requests");
   const container4 = screen.getByText("Add a friend");

   expect(container1).toBeInTheDocument();
   expect(container2).toBeInTheDocument();
   expect(container3).toBeInTheDocument();
   expect(container4).toBeInTheDocument();
});
