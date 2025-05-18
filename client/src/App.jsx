import { Routes, Route } from "react-router-dom";
import SendNotification from "./pages/SendNotification";
import ViewNotifications from "./pages/ViewNotifications";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SendNotification />} />
        <Route path="notifications/:userId" element={<ViewNotifications />} />
      </Route>
    </Routes>
  );
}

export default App;
