import React from "react"
import "./booking-form-date-data-display.styles.scss"

const BookingFormDateDataDisplay = ({

                                    value,
                                    selectedFormattedStartTime,
                                    }) => {

    return (
        <div className="booking-form-date-data-display-container">
            <div>
                <div className="booking-form-date-data-display-date-text">
                    {value.toString().substring(0,15)}
                </div>
                <div className="booking-form-date-data-display-time-text">
                    {selectedFormattedStartTime}
                </div>
            </div>
            <div className="booking-form-date-data-display-edit-button">Edit</div>

        </div>
    )
}

export default BookingFormDateDataDisplay;