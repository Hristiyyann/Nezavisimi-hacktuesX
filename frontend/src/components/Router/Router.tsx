
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { useContext } from "react";
import AppContext from "contexts/AppContext";
import { AuthForm } from "components";

function Router() {
    const { accessToken } = useContext(AppContext);

	return (
		<BrowserRouter>
			<Routes>
			{
                !accessToken
                ? 
                <>
                    <Route
                        path = '/sign-in'
                        element = {
                            <AuthForm type = 'sign-in' />
                        }
                    />
                    <Route
                        path = '/sign-up'
                        element = {
                            <AuthForm type = 'sign-up'/>
                        }
                    />
                </>
				:
                <></>
            }
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
