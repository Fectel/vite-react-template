import React from "react"
import { IonHeader,} from "@ionic/react";
import "./header.styles.scss";

const HeaderWithoutImg = () => {

    const headerData = {
        headerTitleText1: "MARIACHI",
        headerTitleText2: "HERMANOS AZTECA",
    }

    return (
        <IonHeader
            className="header-without-img-container">

            <div className="header-title-container">
                <div className="header-title-text-1">
                    {headerData.headerTitleText1}
                </div>
                <div className="header-title-text-2">
                    {headerData.headerTitleText2}
                </div>

            </div>
        </IonHeader>
    )
}
export default HeaderWithoutImg;