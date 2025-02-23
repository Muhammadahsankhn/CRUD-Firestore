const firebaseConfig = {
    apiKey: "AIzaSyABe9akvGdu9TYDzK5Lo6mHplcmT1z4rSM",
    authDomain: "todo-firebase-4823a.firebaseapp.com",
    databaseURL: "https://todo-firebase-4823a-default-rtdb.firebaseio.com",
    projectId: "todo-firebase-4823a",
    storageBucket: "todo-firebase-4823a.firebasestorage.app",
    messagingSenderId: "674625868253",
    appId: "1:674625868253:web:8592a012d76878a803a634",
    measurementId: "G-NHMRW4YXPW"
};

// Initialize Firebase
const frb = firebase.initializeApp(firebaseConfig);
console.log(frb.database);


firebase
    .database()
    .ref("todos")
    .on("child_added", (data) => {
        const liElement = document.createElement('li');
        const taskSpan = document.createElement("span");
        taskSpan.classList.add("task-text"); // Add class for styling
        taskSpan.textContent = data.val().value; // Set task text
        liElement.appendChild(taskSpan);
        // const litext = document.createTextNode(data.val().value);
        // liElement.appendChild(litext)
        const listview = document.getElementById('list');
        listview.appendChild(liElement);
        // console.log(liElement);




        // Edit btn
        const editbtn = document.createElement("button");
        const edittext = document.createTextNode('Edit');
        editbtn.appendChild(edittext);
        editbtn.setAttribute('onclick', 'editItem(this)');
        editbtn.setAttribute('id', data.val().key);
        editbtn.classList.add("edit-btn"); // Add a class for styling
        liElement.appendChild(editbtn);



        // delete btn
        const delbtn = document.createElement('button');
        const deltext = document.createTextNode('Delete')
        delbtn.appendChild(deltext);
        delbtn.setAttribute('onclick', 'deleteitem(this)')
        delbtn.setAttribute('id', data.val().key);
        delbtn.classList.add("del-btn"); // Add a class for styling
        liElement.appendChild(delbtn)
    })

function addtodo() {
    const inp = document.getElementById('inp-task');
    // console.log(inp.value);
    const key = firebase.database().ref("todos").push().key;
    let obj = {
        value: inp.value,
        key: key
    };
    firebase.database().ref("todos").child(key).set(obj)
    inp.value = ""
}

function deleteTodo() {
    const list = document.getElementById('list');
    firebase.database().ref('todos').remove();
    list.innerHTML = ""
}

function deleteitem(thisitem) {
    console.log(thisitem.id);
    firebase.database().ref('todos').child(thisitem.id).remove();
    thisitem.parentNode.remove()
}

function editItem(thisitem) {
    const val = thisitem.parentNode.firstChild.nodeValue;
    const userInp = prompt("Enter edit value :");
    let obj = {
        value: userInp,
        key: thisitem.id
    };
    firebase.database().ref('todos').child(thisitem.id).set(obj);
    thisitem.parentNode.firstChild.nodeValue = userInp;
}