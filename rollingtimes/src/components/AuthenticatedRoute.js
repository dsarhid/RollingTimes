import { Route } from "react-router-dom";
import AccesoNoPermitido from "./Common/AccesoNoPermitido";

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <AccesoNoPermitido></AccesoNoPermitido>}
      />
    );
  }