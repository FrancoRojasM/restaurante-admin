import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"


const uploadFile=(archivo)=>{
    return new Promise ((resolve,reject)=>{
    // creando una referencia de donde y que nombre se va a guardar el archivo
    const extension=archivo.type.split("/")[1]
    const nameUUID= v4()
    const referenceStorage=ref(storage,`fotos/${nameUUID}.${extension}`)
    const uploadTask= uploadBytesResumable(referenceStorage,archivo);
    
    // callback
    uploadTask.on('state_changed',
    // supervisar la subida del archivo
    ()=>{},
    // en caso de error al subir
    (error)=>{reject(error)},
    // cuando ya finaliza la subida del archivo
    ()=>{
        getDownloadURL(referenceStorage)
        .then((url)=>{
            resolve(url)
        })
    }
    )
    })
}

export{
    uploadFile
}

