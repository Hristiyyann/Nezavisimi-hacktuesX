
import { AuthForm } from "components";
import AppContext from "contexts/AppContext";
import NewsDetails from "pages/NewsDetails/NewsDetails";
import { useContext } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

function Router() {
    const { accessToken } = useContext(AppContext);

	return (
		<BrowserRouter>
            <Routes>
			{
                !accessToken ? (
					<>
                        <Route
                            path = '/sign-in'
                            element = { <AuthForm type = 'sign-in' />}
                        />
                        
                        <Route
                            path = '/sign-up'
                            element = {<AuthForm type = 'sign-up'/>}
                        />
					</>
				) 
                : 
                null
            }
			{
                accessToken ? (
					<Route
                        path = '/news'
                        element = { <NewsDetails/> }
                    />
				) 
                : null
            }
				<Route
					path = "/"
					element = {
						accessToken 
                        ? <NewsDetails />
						: <AuthForm type = 'sign-in' />
                    }
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
