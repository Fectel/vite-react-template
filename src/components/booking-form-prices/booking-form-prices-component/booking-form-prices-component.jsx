import React, {useEffect, useState} from "react"
import {IonRow} from "@ionic/react";
import "./booking-form-prices-component.styles.scss"

const BookingFormPricesComponent = ({ selectedPrice, mariachiPackageId, setMariachiPackageId, setFeeTotal,
    setNumberOfMariachis,setSelectedNumberOfHours, numberOfHours, mariachiSize,discounted,  discountedPriceDisplay,
                                      discountedFeePrice, discountedMariachiPackageId, numberOfMariachis, feePrice,
                                        setSelectedPrice, twoHoursOnly,
                                       displayPrice}) => {

    const  [ bgColor, setBgColor ] = useState("white");
    const [ selected, setSelected ] = useState(false)
    useEffect(() => {
        if ( selectedPrice === displayPrice){
            console.log(selectedPrice, displayPrice);
            setSelected(true)
            if (discounted === true){
                setFeeTotal(discountedFeePrice)
            }else {
                setFeeTotal(feePrice)

            }

        }else {
            setSelected(false)
        }
    }, [selectedPrice])

    const onPriceClick = () => {


        setSelectedNumberOfHours(numberOfHours)
            setSelectedPrice(displayPrice)


        console.log(mariachiPackageId, numberOfHours)
        setNumberOfMariachis(mariachiSize)
        if ( discounted === true){
            setMariachiPackageId(discountedMariachiPackageId)
        }else {
            setMariachiPackageId(mariachiPackageId)

        }



    }
    console.log( selectedPrice)
    const style = {
        border: selected ? "solid #490411FF thin" : "solid thin",
        backgroundColor: selected ? "#490411" : "#fff",
        color: selected ? "#fff" : "black",
    }
    return (

        <IonRow

            style={style} onClick={() => onPriceClick({displayPrice})} className="mariachi-price-option">

            <div className="mariachi-price-option-text">
                {displayPrice}
                {discounted === true &&(

                <div className="price-slash"></div>
                )}

            </div>

            {discountedFeePrice > 0 && discounted && (
                    <div className="discounted-price-div">
                        ${discountedFeePrice}

                    </div>
            )}

            {/*<div className="price-wrapper">*/}
            {/*    <div className="price">$100</div>*/}
            {/*</div>*/}
        </IonRow>
    )
}
export default BookingFormPricesComponent;