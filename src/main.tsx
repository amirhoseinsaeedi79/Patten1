import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom";

import Loading from "@/components/Loading"
import ReactDOM from "react-dom/client"
import Routes from "@/routers"
import QueryProvider from "@/context/QueryContext"
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
      <QueryProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes />
        </BrowserRouter>
      </QueryProvider>
    </Suspense>
)
