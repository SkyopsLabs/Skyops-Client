'use client'
import React, { useState } from 'react';

const APIKeyField = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <div className="w-full sm:w-2/3">
            <div className="relative">
                <input
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 pr-12.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    type={isPasswordVisible ? "text" : "password"}
                    value="VaQdmMfd4erTopcaNQOl1qbwA8FGAHXCPG56tanDMEaxzkluMAEOyurMI57CeIzx"
                    readOnly
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-20 top-1/2 -translate-y-1/2"
                    aria-label="Toggle apikey visibility"
                >
                    {isPasswordVisible ? (
                        // This is the icon shown when password is visible - typically an 'eye-off' icon
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 125"
                            width="40"
                            height="40"
                            fill="currentColor"
                            className='mt-2'
                        >
                            <g>
                                <path d="M18.45,22.033l9.525,9.524c-7.833,3.848-15.596,9.79-23.229,17.822l0.064,0.062l-0.064,0.062   C19.114,64.621,33.945,72.39,48.827,72.589c0.198,0.003,0.393,0.004,0.59,0.004c5.468,0,10.981-1.041,16.521-3.072l11.014,11.013   l2.566-2.566l-58.501-58.5L18.45,22.033z M49.415,68.963c-0.179,0-0.36-0.001-0.539-0.004c-13.059-0.176-26.2-6.741-39.102-19.516   c6.923-6.853,13.916-11.912,20.928-15.159l6.856,6.856c-1.632,2.354-2.605,5.193-2.605,8.27c0,8.062,6.559,14.62,14.62,14.62   c3.076,0,5.916-0.975,8.27-2.605l5.236,5.236C58.484,68.178,53.925,68.963,49.415,68.963z M55.234,58.817   c-1.654,1.002-3.59,1.582-5.662,1.582c-6.06,0-10.99-4.93-10.99-10.989c0-2.072,0.58-4.008,1.583-5.662L55.234,58.817z" />
                                <path d="M63.124,54.869c0.684-1.689,1.068-3.528,1.068-5.459c0-8.062-6.559-14.62-14.62-14.62c-1.93,0-3.771,0.385-5.459,1.067   l2.881,2.881c0.829-0.201,1.689-0.318,2.579-0.318c6.06,0,10.99,4.93,10.99,10.99c0,0.89-0.118,1.75-0.318,2.578L63.124,54.869z" />
                                <path d="M95.254,49.346C79.71,33.844,64.11,26.117,48.827,26.293c-4.124,0.055-8.244,0.714-12.351,1.927l2.957,2.957   c3.149-0.78,6.299-1.212,9.443-1.255c0.179-0.001,0.358-0.003,0.539-0.003c13.26,0,26.943,6.566,40.717,19.522   c-6.274,5.899-12.529,10.468-18.735,13.699l2.679,2.68c7.049-3.825,14.122-9.245,21.179-16.283l-0.096-0.096L95.254,49.346z" />
                            </g>
                        </svg>
                    ) : (
                        // This is the icon shown when password is hidden - typically an 'eye' icon
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 28 28"
                            className='mt-2'
                            fill="currentColor"><g><path d="M12.5,9A3.5,3.5,0,1,0,16,12.5,3.5,3.5,0,0,0,12.5,9Zm0,6A2.5,2.5,0,1,1,15,12.5,2.5,2.5,0,0,1,12.5,15Zm9.491-2.5a.5.5,0,0,0,0-.1.454.454,0,0,0-.041-.108.512.512,0,0,0-.025-.065l-.01-.014,0,0c-.207-.324-3.461-5.232-9.41-5.232s-9.2,4.908-9.41,5.232l0,0-.01.014a.512.512,0,0,0-.025.065.454.454,0,0,0-.041.108,1.506,1.506,0,0,0,0,.19.471.471,0,0,0,.041.108.512.512,0,0,0,.025.065l.01.014,0,0c.206.323,3.46,5.232,9.41,5.232s9.2-4.909,9.41-5.232l0,0,.01-.014a.512.512,0,0,0,.025-.065.471.471,0,0,0,.041-.108A.5.5,0,0,0,21.991,12.5ZM12.5,17.017c-4.708,0-7.646-3.516-8.388-4.517.742-1,3.68-4.517,8.388-4.517S20.146,11.5,20.888,12.5C20.146,13.5,17.208,17.017,12.5,17.017Z" /></g></svg>
                    )}
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-10 top-1/2 -translate-y-1/2 mt-1"
                        width="45"
                        height="45"
                        viewBox="0 0 28 28"
                        fill="currentColor"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#080341" /></g></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-1 top-1/2 -translate-y-1/2 mt-1"
                        width="45"
                        height="45"
                        viewBox="0 0 28 28"
                        fill="currentColor">
                        <path d="M3 3V9M3 9H9M3 9L5.64028 6.63067C7.02129 5.25209 8.81296 4.35964 10.7453 4.08779C12.6777 3.81593 14.6461 4.17941 16.3539 5.12343C18.0617 6.06746 19.4164 7.54091 20.2139 9.32177M21 21V15M21 15L15 15M21 15L18.3597 17.3693C16.9787 18.7479 15.187 19.6404 13.2546 19.9122C11.3223 20.1841 9.3539 19.8206 7.64609 18.8766C5.93828 17.9325 4.58355 16.4591 3.78603 14.6782" stroke="#001A72" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default APIKeyField;
