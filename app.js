
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
    import { getFirestore , collection, getDocs, addDoc,doc, deleteDoc, query, where, updateDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDbQVPd8rVpzFT63JeApm3Et3zCOICGM-4",
      authDomain: "sample-project-26660.firebaseapp.com",
      projectId: "sample-project-26660",
      storageBucket: "sample-project-26660.appspot.com",
      messagingSenderId: "647324145517",
      appId: "1:647324145517:web:eebce9637ad21533496c64",
      measurementId: "G-ZPXV4K0SBZ"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db =getFirestore(app);
    async function getFoods(db) {
    const foodsCol = collection(db, "Food");
    const foodsSnapshot = await getDocs(foodsCol);
    const foodsList = foodsSnapshot.docs.map((doc) => doc.data());
    return foodsList;
  }
const foodsList = document.querySelector('#Foods-list');
const form = document.querySelector('#add-food-form');

function renderFood(dc){
    let li = document.createElement("li");
    let name = document.createElement("span");
    let type = document.createElement("span");
    let cross =document.createElement('div');

    li.setAttribute('data-id', dc.id);
    name.textContent = dc.data().name;
    type.textContent= dc.data().type;
    cross.textContent='x';

    li.appendChild(name);
    li.appendChild(type);
    li.appendChild(cross);

    foodsList.appendChild(li);
    cross.addEventListener('click',(e)=>{
       e.stopPropagation();
       let id = e.target.parentElement.getAttribute('data-id');
       deleteDoc(doc(db, "Food", id))
       e.target.style.backgroundColor ='red';
       onClick=window.location.reload();
    }
    
    )
}
const foods =getDocs(collection(db, "Food")).then((snapshot)=> (
    snapshot.forEach((doc)=> {
        renderFood(doc);
    })
)
)
 
   

getFoods(db);
const q = query(collection(db, "Food"), where("type","==","italian"));
const querySnapshot= await getDocs(q);
querySnapshot.forEach((doc)=>{
    console.log(doc.id, "=>", doc.data())
})

const upDoc =doc(db,"Food", "vLWuLpoltnrWaUNFiRbc");
updateDoc(upDoc,{
    name:"Flatbread"
})
form.addEventListener(('submit'), (e) => {
            e.preventDefault();
            const docRef = addDoc(collection(db, "Food"), {
                name: form.name.value,
                type: form.type.value
            })
})
