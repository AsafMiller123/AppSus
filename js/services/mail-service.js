import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

const mockedRecipient = {
    email: 'momo@momo.com',
    fullName: 'Momo Moo'
}
const MAILS_KEY = 'mails';
_createMails();


export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    get,
    put,
    loggedInUser
}


function query() {
    return storageService.query(MAILS_KEY)
}


function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId)
}


function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}


function put(mail) {
    return storageService.put(MAILS_KEY, mail);
}


function save(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail)
    else return storageService.post(MAILS_KEY, mail)
    mail.id = utilService.makeId();
    const mails = query();
    mails.push(mail);
    utilService.saveToStorage(MAILS_KEY, mails);
    return mail;
}


function getEmptyMail() {
    return {
        id: null,
        subject: null,
        details: null,
        isRead: false,
        sentAt: Date.now(),
        to: null,
        cc: null,
        bcc: null,
        body: null,
        isCompleted: false,
        isRead: true,
        isStarred: false,
        shouldBeRemoved: false,
        from: null,
    }
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [];
        mails.push(_createMail('Lihi Sered', 'Miss you!', 'Would love to catch up sometimes'));
        mails.push(_createMail('iCloud', 'Come visit!', 'Would love to catch up sometimes'));
        mails.push(_createMail('Shani Aharon', 'Would love to catch up sometimes'));
        mails.push(_createMail('onlyFans', 'Would love to catch up sometimes'));
        mails.push(_createMail('Dor dekel', 'Would love to catch up sometimes'));
        mails.push(_createMail('Trails', 'Childhood stories', 'Would love to catch up sometimes'));
        mails.push(_createMail('Ferari', 'Climbing mountains', 'Would love to catch up sometimes'));
        mails.push(_createMail('lamburgini', 'Last chance', 'Would love to catch up sometimes'));
        mails.push(_createMail('misterbit', 'Relaxing meditation', 'Would love to catch up sometimes'));
        mails.push(_createMail('nerot', 'Beautiful songs', 'Would love to catch up sometimes'));
        mails.push(_createMail('rimonim', 'Good to know more', 'Would love to catch up sometimes'));
        mails.push(_createMail('agasim', 'Reverse parking', 'Would love to catch up sometimes'));
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}


function _createMail(name, subject, body = 'i like hamburger', to = loggedInUser.email, from = mockedRecipient.email) {
    const mail = {
        id: utilService.makeId(),
        name,
        subject,
        body,
        isRead: false,
        sentAt: 1551133930594,
        to,
        isRead: false,
        isStarred: false,
        shouldBeRemoved: false,
        isCompleted: true,
        from,
    }
    return mail;
}
