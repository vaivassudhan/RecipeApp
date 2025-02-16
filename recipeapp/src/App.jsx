import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";

const RecipeDetails = React.lazy(() => import("./pages/RecipeDetails"));
const HomePage = React.lazy(() => import("./pages/HomePage"));

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </Router>
    );
}

export default App;