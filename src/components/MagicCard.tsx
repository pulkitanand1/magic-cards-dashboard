import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";


function MagicCard(){
    const themeContext = useContext(ThemeContext);
    return (
    <div>
        <button type="button" className={`btn btn-${themeContext.isDark ? 'dark' : 'light'} shadow-none`}
         onClick={() => {themeContext.toggleTheme();}}>Update theme</button>
        <br/>
        Hello
    </div>
    );
}
export default MagicCard;