import React, {useState, useEffect} from 'react';
import PageDesign from '../../components/pageDesign/PageDesign';
import './CreateRequestTimeOff.css';

const CreateRequestTimeOff = (() => {

    return (
        <div className="create_request_time_off">
            <PageDesign
                title="Request Time Off"
            >
                <div className="create_request_time_off__content">
                    <div className="content__form">
                        <form>
                            <div className="content__form__period">
                                <lable> Start on: </lable>
                                <input placeholder=""/>
                            </div>
                        </form>

                    </div>
                    <div className="content__info">
                        cdf
                    </div>
                </div>
            </PageDesign>
        </div>
    )
})

export default CreateRequestTimeOff;