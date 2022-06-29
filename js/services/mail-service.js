import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const MAILS_KEY = 'mails';
_createMails();

export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    get,
    getNextMailId
};

function query() {
    return storageService.query(MAILS_KEY)
    // return utilService.loadFromStorage(mailS_KEY);
}

function remove(mailId) {
    // return Promise.reject('Big Error Badd')
    return storageService.remove(MAILS_KEY, mailId)
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function save(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail)
    else return storageService.post(MAILS_KEY, mail)

    // mail.id = utilService.makeId();
    // const mails = query();
    // mails.push(mail);
    // utilService.saveToStorage(mailS_KEY, mails);
    // return mail;
}
function getNextMailId(mailId) {
    return storageService.query(MAILS_KEY)
        .then(mails => {
            const idx = mails.findIndex(mail => mail.id === mailId)
            return (idx < mails.length - 1) ? mails[idx + 1].id : mails[0].id
        })
}

function getEmptyMail() {
    return {
        id: '',
        vendor: '',
        maxSpeed: 0
    };
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [];
        mails.push(_createMail('Audu Mea', 300));
        mails.push(_createMail('Fiak Ibasa', 120));
        mails.push(_createMail('Subali Pesha', 100));
        mails.push(_createMail('Mitsu Bashi', 150));
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}

function _createMail(vendor, maxSpeed = 250) {
    const mail = {
        id: utilService.makeId(),
        vendor,
        maxSpeed,
    };
    return mail;
}



