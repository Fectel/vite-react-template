
import './App.css'
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {AuthProvider} from "./auth-context/auth-context.jsx";
import SplashPage from "./pages/splash-page/splash-page.jsx";
import '@ionic/react/css/core.css';
import AdminPage from "./pages/admin-page/admin-page.jsx";
import CreateBookingPage from "./pages/create-booking-page/create-booking-page.jsx";
import axios from "axios";
import ContractPage from "./pages/contract-page/contract-page.jsx";
import SuccessPayingDeposit from "./pages/success-paying-deposit/succes-paying-deposit.jsx";
import FailurePayingDeposit from "./pages/success-paying-deposit/failure-paying-deposit.jsx";
import ClientDashboard from "./pages/client-dashboard/client-dashboard.jsx";
import SuccessPayingRemainingBalance from "./succes-paying-remaining-balance/success-paying-remaining-balance.jsx";

setupIonicReact();

axios.defaults.baseURL = `http://localhost:5000`

function App() {


  return (
    <IonApp>
<AuthProvider>
    <IonReactRouter>
        <IonRouterOutlet>
            <Route exact path={"/home"}>
                <SplashPage />
            </Route>
            <Route exact path="/client-dashboard">
                {/*<AdminPage />*/}
                <ClientDashboard />
                {/*<PreBookingPage />*/}

            </Route>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/admin-dashboard">
                <AdminPage />
            </Route>
            <Route exact path="/create-booking-page">
                <CreateBookingPage />
            </Route>
            <Route exact path="/contract-page/:id">
                <ContractPage/>
            </Route>
            <Route exact path="/success-paying-deposit/:contractId/:clientId/">
                   <SuccessPayingDeposit />
            </Route>
            <Route exact path="/failure-paying-deposit/:contractId/:clientId/">
                   <FailurePayingDeposit />
            </Route>
            <Route exact path="/success-paying-remaining-balance/:contractId/:clientId">
                <SuccessPayingRemainingBalance />
            </Route>
        </IonRouterOutlet>
    </IonReactRouter>
</AuthProvider>
    </IonApp>
  )
}

export default App
