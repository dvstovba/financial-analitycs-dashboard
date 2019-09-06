import React, {createContext} from "react";

const theme:{[key:string]:string} = {
    blue: '#7544f3',
    yellow: '#f5cb0f'
};
export const ThemeContext = createContext<{[key:string]:string}>({...theme});

const ThemeContextProvider:React.FC = ({children}) =>
    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>;
export default ThemeContextProvider