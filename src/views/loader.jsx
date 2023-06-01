import { RaceBy } from '@uiball/loaders'
import wazAppIcon from '../assets/imgs/icon.png'
import { Lock } from "@mui/icons-material";

function Loader() {
    return (
        <div className="loader">
            <img src={wazAppIcon} alt="" />
            <RaceBy
                size={80}
                lineWeight={5}
                speed={1.4}
                color="#25d366"
            />
            <p className="title">WazApp</p>
            <p><Lock /> End-to-end encrypted</p>
        </div>
    )
}

export default Loader