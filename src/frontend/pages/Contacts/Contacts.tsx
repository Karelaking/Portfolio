import React from 'react';
import ContactsMap from '../../components/Maps/ContactsMap';
import { screenSizeConstants } from '../../constants/SizeConstants';
import LeftContacts from './LeftContacts';
import RightContacts from './RightContacts';

const Contacts: React.FC = () => {
    return (
        <section
            className={`${screenSizeConstants.mainScreenSize} lg:flex-col`}
        >
            <section className={`${screenSizeConstants.mainScreenSize}`}>
                <LeftContacts />
                <RightContacts />
            </section>
            <ContactsMap />
        </section>
    );
};

export default Contacts;
