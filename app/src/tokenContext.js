import { createContext } from 'react';
const TokenContext = createContext();

const TokenProvider = ({ children, value }) => {
    return(
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    );
}

const withToken = (Child) => (props) =>
    <TokenContext.Consumer>
        {context => <Child {...props} {...context}/> }
    </TokenContext.Consumer>

export { TokenProvider, withToken }