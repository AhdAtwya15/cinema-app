import { RouterProvider } from "react-router-dom"
import Router from "./Router/Router"
import { Toaster } from "react-hot-toast"


function App() {


  return (
    <main>
      <RouterProvider router={Router} />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  )
}

export default App
