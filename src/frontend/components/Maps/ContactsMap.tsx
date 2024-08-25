import React from 'react';
import { colorConstants } from '../../constants/ColorsConstants';

const ContactsMap: React.FC = () => {
    return (
        <div className={`w-full my-10 lg:my-0 rounded-md`}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228625.17205286093!2d80.17323066304016!3d26.447078786158215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1723488451008!5m2!1sen!2sin"
                className={`w-full lg:h-[24rem] ${colorConstants.primaryBackgroundColor} mb-10 rounded-md`}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default ContactsMap;
