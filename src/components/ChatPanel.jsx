import React from 'react';

// Integrate the SDK
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';

// The following uses the App instance as an example.
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            appConfig: {
                appID: 130638254,        // The AppID you get from the ZEGOCLOUD admin console.
                serverSecret: '9f16d09601ff25ad54cdb06c18fc68b3' // The serverSecret you get from ZEGOCLOUD Admin Console.
            },
            // The userID and userName is a strings of 1 to 32 characters.
            // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
            userInfo: {
                // Your ID as a user.
                userID: '0000001',
                // Your name as a user.
                userName: 'Chigozzdev',
                // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
                userAvatarUrl: 'https://www.pngmart.com/image/479973/png/479972'
            },
        }
    }
    async componentDidMount() {
        const zimKit = new ZIMKitManager();
        const token = zimKit.generateKitTokenForTest(this.state.appConfig.appID, this.state.appConfig.serverSecret, this.state.userInfo.userID);
        await zimKit.init(this.state.appConfig.appID);
        await zimKit.connectUser(this.state.userInfo, token);
    }
    render() {
        return (
            <Common></Common> 
        );
    }
}