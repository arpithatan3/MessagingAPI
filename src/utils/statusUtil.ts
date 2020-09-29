import * as Constants from './constants';

export default function(status: string): Status {
    switch(status) {
        case Constants.EVENT_REGISTERED: 
            return {
                status: true,
                status_code: Constants.EVENT_REGISTERED,
                message: 'Event Registered'
            };
        case Constants.EVENT_UNREGISTERED: 
            return {
                status: true,
                status_code: Constants.EVENT_UNREGISTERED,
                message: 'Event Unregistered'
            };
        case Constants.EVENT_DELETED: 
            return {
                status: true,
                status_code: Constants.EVENT_DELETED,
                message: 'Event Deleted'
            }
        case Constants.EVENT_NOT_FOUND: 
            return {
                status: false,
                status_code: Constants.EVENT_NOT_FOUND,
                message: 'Event Not Found'
            }; 
        case Constants.HANDLER_UPDATED: 
            return {
                status: true,
                status_code: Constants.HANDLER_UPDATED,
                message: 'Handler Updated'
            }; 
        case Constants.HANDLER_NOT_FOUND: 
            return {
                status: false,
                status_code: Constants.HANDLER_NOT_FOUND,
                message: 'Handler Not Found'
            };  
    }
}