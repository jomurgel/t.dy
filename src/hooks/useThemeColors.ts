import { useContext } from "react";
import ThemeContext from "../providers/ThemeProvider";

const useThemeColors = () => {
    const { theme } = useContext(ThemeContext);

    let colors = ['rgba(246,215,148,0.5)', 'rgba(238,113,113,0.5)']

    switch (theme) {
        case 'dark':
            colors = ['rgba(82, 229, 231,0.5)', 'rgba(19, 12, 183,0.5)'];
            break;
    }

    return colors;
}

export default useThemeColors;