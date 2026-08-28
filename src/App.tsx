import { MotionConfig } from "framer-motion";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
