import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

export function productlist()
{
    return new Promise((resolve,reject)=>{
        firestore.collection("products").get().then(data=>{
            let result = [];
            data.docs.map(ref=>{               
                result.push({id:ref.id,...ref.data()});
            })

            resolve(result);
        }).catch(err=>{
            console.log(err);
            reject(err);
        })
    })
}

export function addproduct(data)
{
    return new Promise((resolve,reject)=>{
        firestore.collection("products").add(data).then(async(result)=>{
            return (await result.get()).data();
        }).catch(err=>reject(err))
    })
}

export function getcategory()
{
    return new Promise((resolve,reject)=>{
        firestore.collection("categories").get().then(data=>{
            let result = [];
            data.docs.map(ref=>{               
                result.push({id:ref.id,...ref.data()});
            })

            resolve(result);
        }).catch(err=>{
            console.log(err);
            reject(err);
        })
    })
}

export function addcategory(data)
{
    return new Promise((resolve,reject)=>{
        firestore.collection("categories").add(data).then(async(result)=>{
            return (await result.get()).data();
        }).catch(err=>reject(err))
    })
}

export function getbrand()
{
    return new Promise((resolve,reject)=>{
        firestore.collection("brands").get().then(data=>{
            let result = [];
            data.docs.map(ref=>{               
                result.push({id:ref.id,...ref.data()});
            })

            resolve(result);
        }).catch(err=>{
            console.log(err);
            reject(err);
        })
    })
}

export function addbrand({brand})
{
    console.log(brand);
    return new Promise((resolve,reject)=>{
        firestore.collection("brands").add(brand).then(async(result)=>{
            let brandlist = await result.get();
            let branddata = brandlist.data();
            branddata.id = brandlist.id;
            console.log(branddata);
            resolve(branddata);
            //firestore.collection("brands").doc(brandlist.id).set(branddata);
        }).catch(err=>reject(err))
    })
}

export function deletebrand({id})
{
    return new Promise((resolve,reject)=>{
        firestore.collection("brands").doc(id).delete().then(result=>{
            resolve(true);
        }).catch(err=>{
            resolve(false);
        })
    })
}

export function updatebrand({id,brand})
{
    return new Promise((resolve,reject)=>{
        firestore.collection("brands").doc(id).set(brand).then(result=>{
            brand.id = id;
            resolve({id:id,brand:brand});
        }).catch(err=>reject(err))
    })
}