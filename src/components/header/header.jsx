import React from "react"
import { IonHeader} from "@ionic/react";

import headerImg from "../../assets/GroupPic.png";
import "./header.styles.scss";

const Header = () => {

    const headerData = {
        headerTitleText1: "MARIACHI",
        headerTitleText2: "HERMANOS AZTECA",
    }

    return (
        <IonHeader
            className="header-container">

            <div className="header-title-container">
                <div className="header-title-text-1">
                    {headerData.headerTitleText1}
                </div>
                <div className="header-title-text-2">
                    {headerData.headerTitleText2}
                </div>
                <div className="header-img-container">
                    <img className="header-img" src={headerImg} alt="mariachi-group-picture"/>
                </div>

            </div>
        </IonHeader>
    )
}
export default Header;