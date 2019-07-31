const { hash } = require('../account/helper')
const AccountTable = require('../account/table')
const Session = require('../account/session.js');


const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;
        if (sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId });

            setSessionCookie({ sessionString, res });

            resolve({ message: 'Session Restored' });
        } else {
            session = new Session({ username });
            sessionString = session.toString();

            AccountTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username)
            })
                .then(() => {
                    setSessionCookie({ sessionString, res });

                    resolve({ message: 'Session Created' });
                })
                .catch(error => reject(error));
        }
    });

}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: new Date(Date.now() + 3600000),
        httpOnly: true
        //secure set to true implies cookie is sent only via https
        //secure: true
    });
}

const authenticatedAccount = ({ sessionString }) => {
    return new Promise((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString)) {
            const error = new Error('Invalid Session');

            error.statusCode = 400;

            return reject(error);
        }
        else {
            const { username, id } = Session.parse(sessionString);

            AccountTable.getAccount({ usernameHash: hash(username) })
                .then(({ account }) => {
                    const authenticated = account.sessionId === id;

                    resolve({ account, authenticated, username });
                })
                .catch(error => reject(error));
        }
    })
};



module.exports = { setSession, authenticatedAccount }