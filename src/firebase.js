import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { updateDoc, query, orderBy} from "firebase/firestore"
import {getStorage, ref, getDownloadURL, uploadBytes, deleteObject} from  'firebase/storage'

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {doc, getDoc, setDoc, deleteDoc, collection, addDoc, getFirestore, getDocs} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDnqk6FxE6Ttp8yS69mdiqVk9rKT_fsgac",
    authDomain: "mariachi-amador.firebaseapp.com",
    projectId: "mariachi-amador",
    storageBucket: "mariachi-amador.appspot.com",
    messagingSenderId: "114419724887",
    appId: "1:114419724887:web:18c1bf37fb048727902912",
    measurementId: "G-QEBKB0WPJP"
    // apiKey: "AIzaSyC_U74LLADvCzro4OZsFTI3nkQ1BeuOhFM",
    // authDomain: "mariachi-amador-az.firebaseapp.com",
    // projectId: "mariachi-amador-az",
    // storageBucket: "mariachi-amador-az.appspot.com",
    // messagingSenderId: "863888608620",
    // appId: "1:863888608620:web:799b4afb2b5a6ece983749",
    // measurementId: "G-Y5B0TEC8QH"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);


export const loadAllBookingRequests = async () => {

    const adminBookingRef = collection(db, `adminBookingRequests`)

    const querySnapshot = await getDocs(query(adminBookingRef, orderBy('bookingDate', 'asc')));

    //
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // })



    return querySnapshot;
}
export const loadAllPastBookingRequests = async () => {

    const adminBookingRef = collection(db, `adminPastBookingRequests`)

    const querySnapshot = await getDocs(query(adminBookingRef, orderBy('bookingDate', 'asc')));

    //
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // })



    return querySnapshot;
}

export const loadMyBookingRequests = async (userId) => {

    const querySnapshot = await getDocs(collection(db, `clients/${userId}/bookingRequests`));

    async function loadFunction(data) {

        console.log(data)

        const promises = data.docs.map(async (x) => {
            console.log(x.id)
            let snapshot = await getDoc(doc(db, "adminBookingRequests", x.id))

            console.log(snapshotArr, snapshot.data())
            // snapshotArr = [ snapshot.data(), ...snapshotArr]
            snapshotArr.push(snapshot.data())
            console.log(snapshotArr)


            return snapshotArr;


        })
        // return promises;
        return Promise.all(promises);

    }
    let snapshotArr = [];


    let res = await loadFunction(querySnapshot)

    console.log(res[0])
    console.log(Array.from(res[0]))
    return res[0];


}

export const loadMyPastBookingRequests = async (userId) => {
    const querySnapshot = await getDocs(collection(db, `clients/${userId}/pastBookingRequests`));

    return querySnapshot;
}

export const updateBookingStatusToBookingPayed = async (userId, contractId, remainingBalanceInvoiceUrl) => {
    console.log(userId, contractId, remainingBalanceInvoiceUrl)
    const status = "Ready For Performance!"
    const adminBookingRef = doc(db, `adminBookingRequests/${contractId}`)

    await updateDoc(adminBookingRef,{

        status, remainingBalanceInvoiceUrl,
    }).then((x) => console.log(x))
}
export const updateBookingStatusToReserved = async (userId, contractId, depositInvoiceUrl, contractImgUrl) => {
    const status = "Reserved"
    const clientBookingRef = doc(db, `clients/${userId}/bookingRequests/${contractId}`)
    const adminBookingRef = doc(db, `adminBookingRequests/${contractId}`)


    let snapshot = await getDoc(doc(db, "adminBookingRequests", contractId))
    console.log(snapshot.data().contractSignatureUrl)
    await setDoc(doc(db, 'clients', userId, "bookingRequests", contractId), {
        contractId,
    })
    await updateDoc(adminBookingRef,{
        status, contractSignatureUrl: snapshot.data().contractSignatureUrl,depositInvoiceUrl, contractImgUrl,

    }).then((x) => console.log(x))
}
export const updateBookingStatusToReservedCash = async (userId, contractId) => {
    const status = "Reserved"
    const adminBookingRef = doc(db, `adminBookingRequests/${contractId}`)

    await setDoc(doc(db, 'clients', userId, "bookingRequests", contractId), {
        contractId,
    })
    await updateDoc(adminBookingRef,{
        status,

    }).then((x) => console.log(x))

}
export const updateBookingStatusToContractReady = async (userId, contractId) => {
    const status = "Contract is Ready"
    console.log(userId, contractId)

    const clientBookingRef = doc(db, `clients/${userId}/bookingRequests/${contractId}`)
    const adminBookingRef = doc(db, `adminBookingRequests/${contractId}`)

    // await updateDoc(clientBookingRef, {
    //     status: "Contract is Ready"
    // }).then((x) => console.log(x))
    await updateDoc(adminBookingRef,{
        status: "Contract is Ready"

    }).then((x) => console.log(x))
}
export const createClientBookingRequestDocument = async ( BookingRequest) => {
    console.log(BookingRequest)
    const {clientName,
        performanceTime,
        clientEmail,
        clientPhone,
        performanceDate,
        performanceAddress,
        numberOfMariachis,
        feeTotal,
        status,
        mariachiPackageId,
        balanceDue,
        // clientId,
        feeDeposit,} = BookingRequest;
    // const clientBookingRequestsRef = collection(db, 'clients', userId, "bookingRequests")
    //
    // const adminBookingRequestsRef = collection(db, 'adminBookingRequests')

    try {


        const docRef = await addDoc(collection(db, 'adminBookingRequests'), {
            clientName,
            clientId: "",
            clientEmail,
            clientPhone,
            performanceDate,
            performanceAddress,
            performanceTime,
            numberOfMariachis,
            feeTotal,
            feeDeposit,
            balanceDue,
            mariachiPackageId,
            status,
        })

        await setDoc(doc(db, 'adminBookingRequests', docRef.id), {
            docId: docRef.id, ...BookingRequest

        })

        return true;
    }catch (error){
        console.log("Problems with creating a booking request",error.message)
        return false
    }
}

export const adminDeleteClientBookingRequestDocument = async(bookingId, userId) => {

    console.log("Hi delete fb")
    try {
        await deleteDoc(doc(db, "adminBookingRequests", bookingId)).then(x => console.log(x));

        await  deleteDoc(doc(db, "clients", userId, "bookingRequests", bookingId));

    } catch (error) {
        console.log("Problems with deleting booking request", error.message)

    }

}


export const loadContract = async (contractId) => {
    const querySnapshot = await getDoc(doc(db,'adminBookingRequests', contractId));
    // const clientBookingRef = doc(db, `clients/${userId}/bookingRequests/${contractId}`)

    console.log(querySnapshot.data())
    return querySnapshot;
}
export const deleteContractImgFromFirestore = async (clientId, contractId) => {
    const memberWaiverImgRef = ref(storage, `mariachi-contracts/${clientId}/${contractId}/contract-png`)
    const memberWaiverSignatureImgRef = ref(storage, `contract-signatures/${contractId}`)
    const adminBookingRef = doc(db, `adminBookingRequests/${contractId}`)

    await deleteObject(memberWaiverImgRef).then(() =>{
            return console.log("Deleted ContractImgUrl")
    })
    await deleteObject(memberWaiverSignatureImgRef).then(() =>{
            return console.log("Deleted Contract Signature")
    })

    await updateDoc(adminBookingRef,{
         contractImgUrl: "",
         contractSignatureUrl: "",

    }).then((x) => console.log(x))
    // memberWaiverImgRef.delete().then(() => {
    //     return console.log("Deleted ContractImgUrl")
    // })

}
export const saveContractPng = async (contractPngUrl, userId, contractId) => {

    console.log(contractPngUrl, userId, contractId)
    const memberWaiverImgRef = ref(storage, `mariachi-contracts/${userId}/${contractId}/contract-png`)
    const response2 = await fetch(contractPngUrl);
    const blob2 = await response2.blob();
    await uploadBytes(memberWaiverImgRef, blob2).then((snapshot) => {
        console.log("UPLOADED A BLOB 2!")
    })
    const url2 = await getDownloadURL(ref(storage,`mariachi-contracts/${userId}/${contractId}/contract-png`));

    console.log('save waiver img ', url2, );


    const adminBookingRef = doc(db, `adminBookingRequests/${contractId}`)

    await updateDoc(adminBookingRef,{

        contractImgUrl: url2,
    })

    return url2;
}

export const createUserProfileDocument = async (userAuth) => {

    if(!userAuth) return;

    const userRef = doc(db,'clients', userAuth.uid);

    const snapShot = await getDoc(userRef);
    console.log(userRef)
    console.log(snapShot.exists())

    if(!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            console.log("try!!")
            const docRef = await  setDoc(doc(db, "clients" , userAuth.uid  ), {
                displayName,
                email,
                createdAt,
            })

        } catch (error) {
            console.log("error creating user", error.message);
        }
    }else{
        console.log("else snapshot does exist")
    }
    return userRef;
};

export const createUserProfileDocumentAndAddContractToClient = async (userAuth, contractId) => {
    const querySnapshot = doc(db,'adminBookingRequests', contractId);

    if(!userAuth) return;

    const adminBookingRef = doc(db, `adminBookingRequests/${contractId}`)

    const userRef = doc(db,'clients', userAuth.uid);

    const snapShot = await getDoc(userRef);
    console.log(userRef, contractId)
    console.log(snapShot.exists())

    const contractSnapshot = await getDoc(querySnapshot)
    console.log(contractSnapshot.data())

    let bookingData = contractSnapshot.data()
    console.log(bookingData)

    if(!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            console.log("try!!")
            await setDoc(doc(db, 'clients', userAuth.uid, "bookingRequests", contractId), {contractId})
            await  setDoc(doc(db, "clients" , userAuth.uid  ), {
                displayName,
                email,
                createdAt,
            })
            await updateDoc(adminBookingRef, {
                clientId: userAuth.uid
            })

        } catch (error) {
            console.log("error creating user", error.message);
        }
    }else{
        console.log("else snapshot does exist")
        try {
            await setDoc(doc(db, 'clients', userAuth.uid, "bookingRequests", contractId), {contractId})

            await updateDoc(adminBookingRef, {
                clientId: userAuth.uid
            })
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef;
};


export const loadAnyCollectionData = async (path) => {
    const querySnapshot = await getDocs(collection(db, path))
    return querySnapshot;

}
export const addNewMariachiEmployee = async (employee,) => {
    console.log(employee)


    const docRef = await addDoc(collection( db,'mariachi-employees-collection'), {...employee}
    )

    const id = docRef.id;
    console.log(id, "<- docRef.Id")
    await setDoc(doc(db, 'mariachi-employees-collection', docRef.id), {docId: id, ...employee})

}

export const saveNewContractSignaturePicture = async  (blobUrl,name) => {
    console.log(name)
    // const pictureRef = ref(storage,`/menu-item-imgs/${name}`);
    // const menuItemsImgsRef = ref(storage, `admin-signature/${name}`);
    const menuItemsImgsRef = ref(storage, `contract-signatures/${name}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    await uploadBytes(menuItemsImgsRef, blob).then((snapshot) => {
        console.log("UPLOADED A BLOB!")
    })
    // // const snapshot = await pictureRef.storage.ref(`/menu-item-imgs/${name}`).put(blob)
    // // const snapshot = await pictureRef.storage.ref().put(blob);
    // const url = await getDownloadURL(ref(storage,`/admin-signature/${name}`));
    const url = await getDownloadURL(ref(storage,`/contract-signatures/${name}`));
    // const url = await snapshot.ref.getDownloadURL();
    console.log('save picture ', url, );
    return url;
}
export const saveContractSignature = async (docId, imgUrl) => {
    // const {equipmentName} = equipmentName;
    // const {imgUrl} = imgUrl;
    let url;
    console.log("imgUrl: ", imgUrl, " docId: ", docId)
    try {

        const adminBookingsRef = doc(db, `adminBookingRequests/${docId}`)
        // const clientBookingRef = doc(db, `clients/${userId}/bookingRequests/${contractId}`)
        url =  await saveNewContractSignaturePicture(imgUrl, docId)

        await updateDoc(adminBookingsRef, {
            contractSignatureUrl: url
        })

    }catch (e){
        console.log("Problems with adding equipment")
    }

    return url;
}

export const updateScheduleChange = async (dayOfTheWeek, timeSlot, data) => {
    console.log(dayOfTheWeek, timeSlot, data)
    const path = "zQueens-class-schedule"+ "/"+dayOfTheWeek;
    console.log(path)
    const scheduleRef = doc(db, "zQueens-class-schedule",dayOfTheWeek);

    try {
        await updateDoc(scheduleRef, {
            [timeSlot]: data
        })

        console.log("Succesfully Updated Schedule for ", dayOfTheWeek, timeSlot)
    }catch (e) {
        console.log("Error ", e.message())
    }

}
export const deleteContractPicture = async () => {

}